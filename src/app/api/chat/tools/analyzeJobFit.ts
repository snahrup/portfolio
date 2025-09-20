import { tool } from 'ai';
import { z } from 'zod';
import { calculateDetailedMatch } from './analyzeJobFitAgents';

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
  
  const hasJobUrl = JOB_PATTERNS.urlPatterns.some(pattern => 
    lowerText.includes(pattern)
  );
  
  const keywordMatches = JOB_PATTERNS.keywords.filter(keyword => 
    lowerText.includes(keyword)
  ).length;
  
  const hasPhrases = JOB_PATTERNS.phrases.some(phrase => 
    lowerText.includes(phrase)
  );
  
  return hasJobUrl || keywordMatches >= 2 || hasPhrases;
}

// Extract required skills from job description
function extractRequiredSkills(jobText: string): string[] {
  const skills = [];
  const lowerText = jobText.toLowerCase();
  
  // Common technical skills to look for
  const techSkills = [
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'C++', 'Go', 'Rust',
    'React', 'Angular', 'Vue', 'Next.js', 'Node.js', 'Express', 'Django', 'Flask',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
    'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch',
    'Power BI', 'Tableau', 'Looker', 'Databricks', 'Snowflake',
    'Git', 'CI/CD', 'Jenkins', 'GitHub Actions', 'GitLab',
    'Airflow', 'Spark', 'Kafka', 'dbt', 'Fivetran',
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
    'Pandas', 'NumPy', 'Scikit-learn', 'LangChain', 'OpenAI'
  ];
  
  techSkills.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      skills.push(skill);
    }
  });
  
  // Also look for patterns like "X years of Y experience"
  const yearsPattern = /(\d+)\+?\s*years?\s+(?:of\s+)?(?:experience\s+)?(?:with\s+)?([a-zA-Z\s]+)/gi;
  let match;
  while ((match = yearsPattern.exec(jobText)) !== null) {
    const skill = match[2].trim();
    if (!skills.includes(skill) && skill.length < 30) {
      skills.push(skill);
    }
  }
  
  return skills;
}

export const analyzeJobFit = tool({
  description: 'Analyze how well Steve fits a job description with realistic scoring',
  parameters: z.object({
    jobDescription: z.string().describe('The full job description text or URL'),
    isUrl: z.boolean().optional().describe('Whether the input is a URL')
  }),
  execute: async ({ jobDescription, isUrl }) => {
    let jobContent = jobDescription;
    
    // URL handling (if needed)
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
    
    // Extract required skills
    const requiredSkills = extractRequiredSkills(jobContent);
    
    // Calculate detailed matches with realistic scores
    const skillMatches = requiredSkills.map(skill => {
      const matchScore = calculateDetailedMatch(skill, 'general');
      return {
        name: skill,
        score: matchScore,
        category: determineCategory(skill)
      };
    });
    
    // Sort by match score
    skillMatches.sort((a, b) => b.score - a.score);
    
    // Categorize matches
    const strongMatches = skillMatches.filter(s => s.score >= 70);
    const partialMatches = skillMatches.filter(s => s.score >= 40 && s.score < 70);
    const gaps = skillMatches.filter(s => s.score < 40);
    
    // Calculate realistic overall score
    let overallScore = 0;
    if (skillMatches.length > 0) {
      const weights = {
        strong: 1.0,
        partial: 0.5,
        gap: 0.1
      };
      
      const weightedSum = 
        strongMatches.reduce((sum, s) => sum + s.score * weights.strong, 0) +
        partialMatches.reduce((sum, s) => sum + s.score * weights.partial, 0) +
        gaps.reduce((sum, s) => sum + s.score * weights.gap, 0);
      
      const totalWeight = 
        strongMatches.length * weights.strong +
        partialMatches.length * weights.partial +
        gaps.length * weights.gap;
      
      overallScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
      
      // Apply reality check - rarely above 85%
      if (overallScore > 85) {
        overallScore = 85 + Math.round((overallScore - 85) * 0.3);
      }
    }
    
    // Prepare top skills for display (showing realistic percentages)
    const topSkills = skillMatches.slice(0, 5).map(skill => ({
      name: skill.name,
      required: 100,
      mine: skill.score
    }));
    
    // Build radar data with realistic scores
    const radarData = [
      { 
        category: 'Technical', 
        value: calculateCategoryScore(skillMatches, 'technical'),
        fullMark: 100
      },
      { 
        category: 'Experience', 
        value: calculateExperienceScore(jobContent),
        fullMark: 100
      },
      { 
        category: 'Domain', 
        value: calculateCategoryScore(skillMatches, 'domain'),
        fullMark: 100
      },
      { 
        category: 'Tools', 
        value: calculateCategoryScore(skillMatches, 'tools'),
        fullMark: 100
      },
      { 
        category: 'Cloud/Data', 
        value: calculateCategoryScore(skillMatches, 'cloud'),
        fullMark: 100
      },
      { 
        category: 'Soft Skills', 
        value: 75, // Default for soft skills
        fullMark: 100
      }
    ];
    
    // Generate recommendation based on realistic score
    const recommendation = generateRecommendation(overallScore, strongMatches, gaps);
    
    // Identify relevant projects
    const relevantProjects = identifyRelevantProjects(skillMatches);
    
    return {
      type: 'job_analysis',
      overall_match: overallScore,
      skills_match: topSkills,
      radar_data: radarData,
      gaps: gaps.slice(0, 3).map(g => ({
        name: g.name,
        category: g.category,
        severity: g.score < 20 ? 'high' : 'medium'
      })),
      highlights: strongMatches.slice(0, 3).map(s => ({
        name: s.name,
        category: s.category,
        strength: s.score,
        note: s.score === 100 ? 'Expert level' : s.score >= 80 ? 'Strong proficiency' : 'Good experience'
      })),
      recommendation,
      relevant_projects: relevantProjects
    };
  }
});

function determineCategory(skill: string): string {
  const categories = {
    technical: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'SQL'],
    frameworks: ['React', 'Angular', 'Vue', 'Django', 'Flask', 'Express'],
    cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
    data: ['PostgreSQL', 'MongoDB', 'Redis', 'Snowflake'],
    tools: ['Git', 'Jenkins', 'Airflow', 'Power BI', 'Tableau'],
    domain: ['Machine Learning', 'Data Engineering', 'DevOps']
  };
  
  for (const [cat, skills] of Object.entries(categories)) {
    if (skills.some(s => skill.toLowerCase().includes(s.toLowerCase()))) {
      return cat;
    }
  }
  return 'general';
}

function calculateCategoryScore(matches: any[], category: string): number {
  const categoryMatches = matches.filter(m => m.category === category);
  if (categoryMatches.length === 0) return 60;
  
  const avg = categoryMatches.reduce((sum, m) => sum + m.score, 0) / categoryMatches.length;
  return Math.round(avg);
}

function calculateExperienceScore(jobText: string): number {
  const yearsMatch = jobText.match(/(\d+)\+?\s*years?\s+(?:of\s+)?experience/i);
  if (!yearsMatch) return 85;
  
  const requiredYears = parseInt(yearsMatch[1]);
  const steveYears = 14;
  
  if (steveYears >= requiredYears) return 95;
  if (steveYears >= requiredYears - 2) return 75;
  if (steveYears >= requiredYears - 4) return 55;
  return 35;
}

function generateRecommendation(score: number, strong: any[], gaps: any[]): string {
  if (score >= 75) {
    return `Strong alignment! This role leverages my expertise in ${strong[0]?.name} and ${strong[1]?.name}. I'd bring immediate value while being excited to deepen my knowledge in ${gaps[0]?.name || 'emerging areas'}.`;
  } else if (score >= 55) {
    return `Solid fit with growth potential. My experience in ${strong[0]?.name} provides a strong foundation. I'd need to ramp up on ${gaps[0]?.name} and ${gaps[1]?.name}, which I'm eager to do.`;
  } else if (score >= 35) {
    return `Partial alignment. While I have transferable skills in ${strong[0]?.name || 'related areas'}, this role would require significant learning in ${gaps[0]?.name} and ${gaps[1]?.name}. I'm up for the challenge if you value learning agility.`;
  }
  return `Limited match. This role requires deep expertise in ${gaps[0]?.name} and ${gaps[1]?.name} that I haven't yet developed. You might find better-aligned candidates, though I'm always eager to expand into new domains.`;
}

function identifyRelevantProjects(matches: any[]): string[] {
  const projects = [];
  const strongSkills = matches.filter(m => m.score >= 70).map(m => m.name.toLowerCase());
  
  if (strongSkills.some(s => s.includes('power bi') || s.includes('business intelligence'))) {
    projects.push('Strainprint Analytics Platform');
  }
  if (strongSkills.some(s => s.includes('data') || s.includes('etl'))) {
    projects.push('Maymont Homes Data Ecosystem');
  }
  if (strongSkills.some(s => s.includes('machine learning') || s.includes('ai'))) {
    projects.push('LinkedIn Job Tracker AI');
  }
  
  return projects.slice(0, 3);
}
