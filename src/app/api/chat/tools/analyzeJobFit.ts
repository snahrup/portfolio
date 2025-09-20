import { tool } from 'ai';
import { z } from 'zod';
import { 
  extractSkillsFromJob, 
  calculateMatchScore, 
  STEVE_SKILLS,
  STEVE_EXPERIENCE 
} from '@/lib/skills-extractor';

// Job description detection patterns
export const JOB_PATTERNS = {
  keywords: [
    'job description', 'job posting', 'position', 'role', 
    'hiring', 'recruit', 'opening', 'opportunity',
    'requirements', 'qualifications', 'responsibilities'
  ],
  urlPatterns: [
    'greenhouse.io', 'lever.co', 'workday.com', 
    'linkedin.com/jobs', 'indeed.com', 'glassdoor.com',
    'careers', 'jobs', 'applicants'
  ],
  phrases: [
    'we are looking for', 'we are hiring', 'seeking a',
    'responsible for', 'requirements:', 'qualifications:',
    'experience with', 'years of experience', 'nice to have'
  ]
};

// Detect if message contains job description
export function isJobDescription(text: string): boolean {
  const lowerText = text.toLowerCase();
  
  // Check for URL patterns
  const hasJobUrl = JOB_PATTERNS.urlPatterns.some(pattern => 
    lowerText.includes(pattern)
  );
  
  // Check for multiple job-related keywords
  const keywordMatches = JOB_PATTERNS.keywords.filter(keyword => 
    lowerText.includes(keyword)
  ).length;
  
  // Check for common job posting phrases
  const hasPhrases = JOB_PATTERNS.phrases.some(phrase => 
    lowerText.includes(phrase)
  );
  
  // Consider it a job description if:
  // - It has a job URL, OR
  // - It has 2+ keywords, OR  
  // - It has job posting phrases
  return hasJobUrl || keywordMatches >= 2 || hasPhrases;
}

export const analyzeJobFit = tool({
  description: 'Analyze how well Steve fits a job description',
  parameters: z.object({
    jobDescription: z.string().describe('The full job description text or URL'),
    isUrl: z.boolean().optional().describe('Whether the input is a URL')
  }),
  execute: async ({ jobDescription, isUrl }) => {
    let jobContent = jobDescription;
    
    // If it's a URL, fetch via our API endpoint (avoids CORS)
    if (isUrl || jobDescription.startsWith('http')) {
      try {
        const response = await fetch('/api/fetch-job', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: jobDescription })
        });
        
        const data = await response.json();
        
        if (data.error) {
          return {
            type: 'job_analysis',
            error: data.error,
            tip: 'You can also copy and paste the job description text directly from the job posting.'
          };
        }
        
        jobContent = data.content;
      } catch (error) {
        console.error('Failed to fetch job URL:', error);
        return {
          type: 'job_analysis',
          error: 'Unable to fetch the job posting. Please copy and paste the job description text directly.',
          tip: 'Select all text on the job page (Ctrl+A or Cmd+A), copy it, and paste here.'
        };
      }
    }
    
    // Extract skills from job description
    const requiredSkills = extractSkillsFromJob(jobContent);
    const overallScore = calculateMatchScore(requiredSkills, STEVE_SKILLS);
    
    // Build skills match details
    const skillsMatch = [];
    let topMatches = [];
    let gaps = [];
    
    // Check each skill category
    Object.entries(requiredSkills).forEach(([category, skills]) => {
      (skills as string[]).forEach(skill => {
        const hasSkill = STEVE_SKILLS[category as keyof typeof STEVE_SKILLS]
          .some(s => s.toLowerCase() === skill.toLowerCase());
        
        if (hasSkill) {
          topMatches.push({
            name: skill,
            category,
            strength: 100
          });
        } else {
          // Check if similar skill exists
          let similarFound = false;
          Object.entries(STEVE_SKILLS).forEach(([cat, steveSkills]) => {
            if (steveSkills.some(s => 
              s.toLowerCase().includes(skill.toLowerCase()) || 
              skill.toLowerCase().includes(s.toLowerCase())
            )) {
              topMatches.push({
                name: skill,
                category,
                strength: 70,
                note: `Similar: ${steveSkills.find(s => 
                  s.toLowerCase().includes(skill.toLowerCase()) || 
                  skill.toLowerCase().includes(s.toLowerCase())
                )}`
              });
              similarFound = true;
            }
          });
          
          if (!similarFound) {
            gaps.push({
              name: skill,
              category,
              severity: 'medium'
            });
          }
        }
      });
    });
    
    // Get top 5 skills for display
    const top5Skills = topMatches.slice(0, 5).map(skill => ({
      name: skill.name,
      required: 100,
      mine: skill.strength  // Changed from 'yours' to 'mine'
    }));
    
    // Calculate category scores for radar
    const radarData = [
      { 
        category: 'Technical', 
        value: calculateCategoryMatch(requiredSkills.languages.concat(requiredSkills.frameworks)),
        fullMark: 100
      },
      { 
        category: 'Experience', 
        value: jobDescription.toLowerCase().includes('years') ? 85 : 100,
        fullMark: 100
      },
      { 
        category: 'Domain', 
        value: calculateCategoryMatch(requiredSkills.domains),
        fullMark: 100
      },
      { 
        category: 'Tools', 
        value: calculateCategoryMatch(requiredSkills.tools),
        fullMark: 100
      },
      { 
        category: 'Cloud/Data', 
        value: calculateCategoryMatch(requiredSkills.cloud.concat(requiredSkills.databases)),
        fullMark: 100
      },
      { 
        category: 'Soft Skills', 
        value: 90, // Steve has strong leadership and communication
        fullMark: 100
      }
    ];
    
    // Generate recommendation
    let recommendation = '';
    if (overallScore >= 80) {
      recommendation = "Excellent fit! This role aligns strongly with my experience. I'd love to discuss how my expertise in " +
        topMatches[0]?.name + " and " + topMatches[1]?.name + " can contribute to your team.";
    } else if (overallScore >= 60) {
      recommendation = "Good alignment with growth potential. My strong background in " +
        topMatches[0]?.name + " positions me well for this role, and I'm eager to expand my skills in " +
        gaps[0]?.name + ".";
    } else if (overallScore >= 40) {
      recommendation = "Partial match with transferable skills. While I'd need to develop expertise in " +
        gaps[0]?.name + ", my experience in " + STEVE_SKILLS.domains[0] + 
        " and proven ability to learn quickly could make this work.";
    } else {
      recommendation = "Limited alignment. This role requires significant expertise in " +
        gaps[0]?.name + " and " + gaps[1]?.name + 
        " that I haven't developed yet. You may want to consider candidates with more direct experience in these areas.";
    }
    
    // Identify relevant projects
    const relevantProjects = identifyRelevantProjects(requiredSkills);
    
    return {
      type: 'job_analysis',
      overall_match: overallScore,
      skills_match: top5Skills,
      radar_data: radarData,
      gaps: gaps.slice(0, 3),
      highlights: topMatches.slice(0, 3),
      recommendation,
      relevant_projects: relevantProjects
    };
  }
});

function calculateCategoryMatch(skills: string[]): number {
  if (skills.length === 0) return 100;
  
  let matched = 0;
  skills.forEach(skill => {
    // Check if Steve has this skill anywhere
    Object.values(STEVE_SKILLS).forEach(categorySkills => {
      if (categorySkills.some(s => 
        s.toLowerCase() === skill.toLowerCase() ||
        s.toLowerCase().includes(skill.toLowerCase())
      )) {
        matched++;
      }
    });
  });
  
  return Math.round((matched / skills.length) * 100);
}

function identifyRelevantProjects(requiredSkills: any): string[] {
  const projects = [];
  
  // Check for BI/Analytics needs
  if (requiredSkills.tools.some((t: string) => t.toLowerCase().includes('power bi')) ||
      requiredSkills.domains.some((d: string) => d.toLowerCase().includes('business intelligence'))) {
    projects.push('Strainprint Analytics Platform');
    projects.push('Maymont Homes Data Ecosystem');
  }
  
  // Check for ML/AI needs  
  if (requiredSkills.domains.some((d: string) => 
    d.toLowerCase().includes('machine learning') || 
    d.toLowerCase().includes('ai'))) {
    projects.push('LinkedIn Job Tracker AI');
    projects.push('Real Estate Price Predictor');
  }
  
  // Check for cloud/data engineering
  if (requiredSkills.cloud.length > 0 || 
      requiredSkills.tools.some((t: string) => t.toLowerCase().includes('etl'))) {
    projects.push('Microsoft Fabric Practice Implementation');
    projects.push('Data System Overhaul - 30+ sources');
  }
  
  return projects.slice(0, 3);
}