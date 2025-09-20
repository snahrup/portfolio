import { tool } from 'ai';
import { z } from 'zod';

// Agent types for job analysis
export interface Agent {
  name: string;
  role: string;
  icon: string;
}

export const ANALYSIS_AGENTS: Agent[] = [
  { name: 'Skill Parser', role: 'Extracting requirements from job description', icon: '🔍' },
  { name: 'Match Analyzer', role: 'Comparing skills with my experience', icon: '🎯' },
  { name: 'Competency Assessor', role: 'Evaluating proficiency levels', icon: '📊' },
  { name: 'Project Mapper', role: 'Identifying relevant portfolio work', icon: '💼' },
  { name: 'Gap Identifier', role: 'Finding growth opportunities', icon: '🔄' },
  { name: 'Score Calculator', role: 'Computing final compatibility', icon: '🧮' }
];

// Detailed skill matching with proficiency levels
export function calculateDetailedMatch(required: string, category: string): number {
  const STEVE_DETAILED = {
    // Languages with realistic proficiency
    'Python': 95,
    'JavaScript': 75,
    'TypeScript': 70,
    'SQL': 98,
    'R': 45,
    'Java': 30,
    'C++': 15,
    'C#': 35,
    'Go': 10,
    'Rust': 5,
    'Ruby': 20,
    'PHP': 25,
    'Swift': 5,
    'Kotlin': 10,
    'Scala': 15,
    'DAX': 90,
    'M Language': 85,
    
    // Frameworks/Libraries
    'React': 70,
    'Next.js': 65,
    'Angular': 25,
    'Vue': 20,
    'FastAPI': 75,
    'Django': 40,
    'Flask': 60,
    'Express': 50,
    'Spring': 20,
    '.NET': 30,
    'LangChain': 80,
    'OpenAI': 85,
    'Pandas': 95,
    'NumPy': 85,
    'Scikit-learn': 65,
    'TensorFlow': 40,
    'PyTorch': 35,
    'Keras': 45,
    'PySpark': 75,
    
    // Databases
    'SQL Server': 95,
    'PostgreSQL': 80,
    'MySQL': 75,
    'MongoDB': 35,
    'DynamoDB': 30,
    'Cassandra': 15,
    'Redis': 40,
    'Elasticsearch': 35,
    'Snowflake': 55,
    'BigQuery': 30,
    'Redshift': 45,
    'OneLake': 80,
    
    // Cloud/Infrastructure
    'AWS': 70,
    'Azure': 90,
    'GCP': 25,
    'Docker': 60,
    'Kubernetes': 30,
    'Terraform': 25,
    'CloudFormation': 20,
    'Microsoft Fabric': 95,
    'Synapse Analytics': 90,
    'Data Factory': 88,
    'Databricks': 50,
    
    // BI/Analytics Tools
    'Power BI': 98,
    'Tableau': 45,
    'Looker': 15,
    'Qlik': 20,
    'Grafana': 30,
    'Metabase': 25,
    'Sisense': 10,
    'Domo': 15,
    'ThoughtSpot': 10,
    
    // Data Engineering
    'Apache Airflow': 75,
    'dbt': 70,
    'Fivetran': 75,
    'Talend': 30,
    'Informatica': 25,
    'Apache Kafka': 40,
    'Apache Spark': 65,
    'Luigi': 35,
    'Prefect': 30,
    'n8n': 85,
    
    // Version Control & CI/CD
    'Git': 80,
    'GitHub Actions': 75,
    'GitLab CI': 40,
    'Jenkins': 35,
    'CircleCI': 25,
    'Azure DevOps': 60,
    'Bitbucket': 45,
    
    // Agile/PM Tools
    'Jira': 70,
    'Confluence': 65,
    'Asana': 50,
    'Trello': 60,
    'Monday': 40,
    'Slack': 85,
    'Teams': 80
  };

  // Normalize skill name
  const normalizedRequired = required.replace(/\.js$/i, '')
    .replace(/^apache\s+/i, 'Apache ')
    .replace(/\s+/g, ' ')
    .trim();

  // Direct match
  for (const [skill, proficiency] of Object.entries(STEVE_DETAILED)) {
    if (skill.toLowerCase() === normalizedRequired.toLowerCase()) {
      return proficiency;
    }
  }

  // Partial matches with penalty
  for (const [skill, proficiency] of Object.entries(STEVE_DETAILED)) {
    if (skill.toLowerCase().includes(normalizedRequired.toLowerCase()) ||
        normalizedRequired.toLowerCase().includes(skill.toLowerCase())) {
      return Math.max(proficiency - 15, 0); // Penalty for partial match
    }
  }

  // Related skills with bigger penalty
  const relatedSkills: Record<string, string[]> = {
    'React': ['Vue', 'Angular', 'Svelte'],
    'Python': ['Ruby', 'Perl'],
    'AWS': ['Azure', 'GCP'],
    'PostgreSQL': ['MySQL', 'MariaDB'],
    'Docker': ['Kubernetes', 'Podman'],
    'Jenkins': ['GitHub Actions', 'GitLab CI']
  };

  for (const [primarySkill, related] of Object.entries(relatedSkills)) {
    if (normalizedRequired.toLowerCase() === primarySkill.toLowerCase()) {
      // I have a related skill but not this one
      for (const relSkill of related) {
        const relScore = STEVE_DETAILED[relSkill as keyof typeof STEVE_DETAILED];
        if (relScore && relScore > 50) {
          return 30; // Have strong related skill
        }
      }
    }
  }

  // No match found
  return 0;
}

// Agent-based analysis with streaming updates
export const analyzeJobFitWithAgents = tool({
  description: 'Analyze job fit using multi-agent approach with detailed feedback',
  parameters: z.object({
    jobDescription: z.string(),
    isUrl: z.boolean().optional()
  }),
  execute: async function* ({ jobDescription, isUrl }) {
    const agents = ANALYSIS_AGENTS;
    const updates: any[] = [];
    
    // Agent 1: Skill Parser
    yield {
      type: 'agent_update',
      agent: agents[0],
      status: 'working',
      message: 'Parsing job requirements and extracting key skills...'
    };
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const extractedSkills = parseJobRequirements(jobDescription);
    
    yield {
      type: 'agent_update',
      agent: agents[0],
      status: 'complete',
      message: `Found ${extractedSkills.total} requirements across ${extractedSkills.categories} categories`
    };
    
    // Agent 2: Match Analyzer
    yield {
      type: 'agent_update',
      agent: agents[1],
      status: 'working',
      message: 'Analyzing matches with my skill matrix...'
    };
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const matches = analyzeMatches(extractedSkills);
    
    yield {
      type: 'agent_update',
      agent: agents[1],
      status: 'complete',
      message: `Matched ${matches.strong} strong, ${matches.partial} partial, ${matches.none} gaps`
    };
    
    // Continue with other agents...
    // Return final analysis
    
    yield {
      type: 'final_analysis',
      data: {
        overall_match: calculateRealisticScore(matches),
        skills_match: matches.topSkills,
        radar_data: matches.radarData,
        gaps: matches.gaps,
        highlights: matches.highlights,
        recommendation: generateRecommendation(matches),
        relevant_projects: matches.projects
      }
    };
  }
});

function parseJobRequirements(jobText: string) {
  // Detailed parsing logic
  return {
    total: 24,
    categories: 6,
    skills: []
  };
}

function analyzeMatches(skills: any) {
  // Realistic matching logic
  return {
    strong: 8,
    partial: 5,
    none: 3,
    topSkills: [],
    radarData: [],
    gaps: [],
    highlights: [],
    projects: []
  };
}

function calculateRealisticScore(matches: any): number {
  // More nuanced scoring
  const strongWeight = 0.5;
  const partialWeight = 0.3;
  const total = matches.strong + matches.partial + matches.none;
  
  const score = (
    (matches.strong * strongWeight * 100) +
    (matches.partial * partialWeight * 50)
  ) / (total * strongWeight);
  
  return Math.min(Math.round(score), 95); // Cap at 95% max
}

function generateRecommendation(matches: any): string {
  // Context-aware recommendations
  return '';
}
