// Enhanced skill extraction with detailed matching logic

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

// Steve's comprehensive skill matrix with proficiency levels
export const STEVE_SKILLS_DETAILED = {
  languages: {
    'Python': { level: 'expert', years: 8 },
    'SQL': { level: 'expert', years: 12 },
    'JavaScript': { level: 'advanced', years: 4 },
    'TypeScript': { level: 'advanced', years: 3 },
    'DAX': { level: 'expert', years: 7 },
    'M Language': { level: 'advanced', years: 5 },
    'R': { level: 'intermediate', years: 2 },
    'Java': { level: 'basic', years: 1 },
    'C#': { level: 'basic', years: 1 }
  },
  frameworks: {
    'React': { level: 'advanced', years: 3 },
    'Next.js': { level: 'intermediate', years: 2 },
    'FastAPI': { level: 'advanced', years: 3 },
    'LangChain': { level: 'advanced', years: 2 },
    'OpenAI': { level: 'expert', years: 2 },
    'PySpark': { level: 'advanced', years: 4 },
    'Pandas': { level: 'expert', years: 6 },
    'NumPy': { level: 'advanced', years: 5 },
    'Scikit-learn': { level: 'intermediate', years: 3 },
    'TensorFlow': { level: 'basic', years: 1 },
    'PyTorch': { level: 'basic', years: 1 }
  },
  databases: {
    'SQL Server': { level: 'expert', years: 10 },
    'PostgreSQL': { level: 'advanced', years: 5 },
    'MySQL': { level: 'advanced', years: 5 },
    'Snowflake': { level: 'intermediate', years: 2 },
    'OneLake': { level: 'advanced', years: 2 },
    'AWS RDS': { level: 'advanced', years: 3 },
    'MongoDB': { level: 'basic', years: 1 },
    'Cassandra': { level: 'none', years: 0 },
    'DynamoDB': { level: 'basic', years: 1 }
  },
  cloud: {
    'Microsoft Azure': { level: 'expert', years: 6 },
    'AWS': { level: 'advanced', years: 4 },
    'Microsoft Fabric': { level: 'expert', years: 2 },
    'Synapse Analytics': { level: 'expert', years: 3 },
    'Data Factory': { level: 'expert', years: 4 },
    'GCP': { level: 'basic', years: 1 },
    'Databricks': { level: 'intermediate', years: 2 }
  },
  tools: {
    'Power BI': { level: 'expert', years: 8 },
    'Docker': { level: 'intermediate', years: 3 },
    'Kubernetes': { level: 'basic', years: 1 },
    'Git': { level: 'advanced', years: 6 },
    'GitHub Actions': { level: 'advanced', years: 3 },
    'Jenkins': { level: 'basic', years: 1 },
    'dbt': { level: 'advanced', years: 3 },
    'Fivetran': { level: 'advanced', years: 3 },
    'Apache Airflow': { level: 'advanced', years: 3 },
    'n8n': { level: 'expert', years: 2 },
    'Tableau': { level: 'intermediate', years: 2 },
    'Looker': { level: 'none', years: 0 },
    'Grafana': { level: 'basic', years: 1 }
  }
};

// Simplified version for backward compatibility
export const STEVE_SKILLS: SkillSet = {
  languages: Object.keys(STEVE_SKILLS_DETAILED.languages).filter(
    skill => STEVE_SKILLS_DETAILED.languages[skill as keyof typeof STEVE_SKILLS_DETAILED.languages].level !== 'none'
  ),
  frameworks: Object.keys(STEVE_SKILLS_DETAILED.frameworks).filter(
    skill => STEVE_SKILLS_DETAILED.frameworks[skill as keyof typeof STEVE_SKILLS_DETAILED.frameworks].level !== 'none'
  ),
  databases: Object.keys(STEVE_SKILLS_DETAILED.databases).filter(
    skill => STEVE_SKILLS_DETAILED.databases[skill as keyof typeof STEVE_SKILLS_DETAILED.databases].level !== 'none'
  ),
  cloud: Object.keys(STEVE_SKILLS_DETAILED.cloud).filter(
    skill => STEVE_SKILLS_DETAILED.cloud[skill as keyof typeof STEVE_SKILLS_DETAILED.cloud].level !== 'none'
  ),
  tools: Object.keys(STEVE_SKILLS_DETAILED.tools).filter(
    skill => STEVE_SKILLS_DETAILED.tools[skill as keyof typeof STEVE_SKILLS_DETAILED.tools].level !== 'none'
  ),
  domains: [
    'Business Intelligence', 'Data Engineering', 'Machine Learning',
    'Predictive Analytics', 'Data Governance', 'ETL/ELT',
    'Real-time Analytics', 'AI Automation', 'Data Warehousing',
    'Data Modeling', 'Performance Optimization', 'Cloud Architecture'
  ],
  soft: [
    'Team Leadership', 'Strategic Planning', 'Cross-functional Collaboration',
    'Mentoring', 'Problem Solving', 'Communication', 'Project Management',
    'Stakeholder Management', 'Agile Methodologies', 'Change Management'
  ]
};