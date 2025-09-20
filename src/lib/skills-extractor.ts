// Skill extraction from Steve's portfolio data
// This dynamically extracts skills from projects and experience

export interface SkillSet {
  languages: string[];
  frameworks: string[];
  databases: string[];
  cloud: string[];
  tools: string[];
  domains: string[];
  soft: string[];
}

export interface Experience {
  years: number;
  roles: string[];
  industries: string[];
}

// Steve's comprehensive skill matrix based on resume
export const STEVE_SKILLS: SkillSet = {
  languages: [
    'Python', 'SQL', 'JavaScript', 'TypeScript', 'DAX', 'M Language'
  ],
  frameworks: [
    'React', 'Next.js', 'FastAPI', 'LangChain', 'OpenAI', 
    'PySpark', 'Pandas', 'NumPy', 'Scikit-learn'
  ],
  databases: [
    'SQL Server', 'PostgreSQL', 'MySQL', 'Snowflake', 
    'OneLake', 'AWS RDS', 'S3'
  ],
  cloud: [
    'Microsoft Azure', 'AWS', 'Microsoft Fabric', 
    'Synapse Analytics', 'Data Factory', 'Power BI Service'
  ],
  tools: [
    'Power BI', 'Docker', 'Git', 'GitHub Actions', 'CI/CD',
    'dbt', 'Fivetran', 'Apache Airflow', 'n8n', 'Pentaho',
    'SAP', 'NetSuite', 'Pinecone'
  ],
  domains: [
    'Business Intelligence', 'Data Engineering', 'Machine Learning',
    'Predictive Analytics', 'Data Governance', 'ETL/ELT',
    'Real-time Analytics', 'AI Automation'
  ],
  soft: [
    'Team Leadership', 'Strategic Planning', 'Cross-functional Collaboration',
    'Mentoring', 'Problem Solving', 'Communication', 'Project Management'
  ]
};

export const STEVE_EXPERIENCE: Experience = {
  years: 14,
  roles: [
    'Practice Director', 'Manager Data Engineering', 
    'Consultant AI Automation', 'BI Leader'
  ],
  industries: [
    'Technology', 'Healthcare/Cannabis', 'Real Estate', 
    'Marketing', 'Consulting'
  ]
};

// Extract skills from job description
export function extractSkillsFromJob(jobText: string): SkillSet {
  const lowerText = jobText.toLowerCase();
  const extracted: SkillSet = {
    languages: [],
    frameworks: [],
    databases: [],
    cloud: [],
    tools: [],
    domains: [],
    soft: []
  };

  // Check each skill category
  Object.entries(STEVE_SKILLS).forEach(([category, skills]) => {
    skills.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        (extracted[category as keyof SkillSet] as string[]).push(skill);
      }
    });
  });

  // Also extract common variations
  const variations: Record<string, string[]> = {
    'power bi': ['powerbi', 'power-bi', 'microsoft bi'],
    'python': ['python3', 'py'],
    'javascript': ['js', 'node', 'nodejs'],
    'typescript': ['ts'],
    'machine learning': ['ml', 'ai', 'artificial intelligence'],
  };

  Object.entries(variations).forEach(([canonical, variants]) => {
    variants.forEach(variant => {
      if (lowerText.includes(variant) && !extracted.languages.includes(canonical)) {
        // Add to appropriate category
        const category = determineCategory(canonical);
        if (category && !extracted[category].includes(canonical)) {
          extracted[category].push(canonical);
        }
      }
    });
  });

  return extracted;
}

function determineCategory(skill: string): keyof SkillSet | null {
  for (const [category, skills] of Object.entries(STEVE_SKILLS)) {
    if (skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())) {
      return category as keyof SkillSet;
    }
  }
  return null;
}

// Calculate match percentage
export function calculateMatchScore(
  requiredSkills: SkillSet,
  steveSkills: SkillSet = STEVE_SKILLS
): number {
  let totalRequired = 0;
  let totalMatched = 0;

  Object.entries(requiredSkills).forEach(([category, skills]) => {
    const categorySkills = skills as string[];
    totalRequired += categorySkills.length;
    
    categorySkills.forEach(skill => {
      const steveCategory = steveSkills[category as keyof SkillSet] as string[];
      if (steveCategory.some(s => s.toLowerCase() === skill.toLowerCase())) {
        totalMatched++;
      }
    });
  });

  if (totalRequired === 0) return 0;
  return Math.round((totalMatched / totalRequired) * 100);
}