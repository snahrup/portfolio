import Image from 'next/image';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Steve Nahrup's projects - Focused on BI Architecture & Data Analytics
const PROJECT_CONTENT = [
  {
    title: 'Enterprise BI Architecture - Fortune 500 Consulting Firm',
    description:
      'Led the complete rebuild of enterprise analytics infrastructure for Senturus, a major Microsoft consulting firm. Architected a unified data platform on Microsoft Fabric that consolidated 30+ disparate data sources into a single source of truth. Designed semantic models, established data governance frameworks (RLS, CI/CD), and created reusable assets that became the foundation for Finance, Sales, Marketing, and Operations reporting. This wasn\'t just building dashboards - it was building the data backbone that powers business decisions across the entire organization.',
    techStack: [
      'Microsoft Fabric',
      'Power BI',
      'Semantic Modeling',
      'Data Governance',
      'Azure',
      'CI/CD',
      'Enterprise Architecture',
    ],
    date: '2023-2024',
    metrics: [
      'Consolidated 30+ data sources into unified platform',
      'Single source of truth for entire enterprise',
      'Enterprise-grade security & governance (RLS, data contracts)',
      'Deployment errors reduced 70% with CI/CD',
      'Reusable semantic models accelerated delivery',
    ],
  },
  {
    title: 'Marketing Analytics Platform - Home Services Company',
    description:
      'Built a comprehensive marketing analytics foundation for Maymont Homes from the ground up. Created a cloud-native BI ecosystem that unified marketing data from ad platforms, CRM, web analytics, and product telemetry into actionable insights. Designed scalable ETL pipelines (Fabric + Spark/dbt) with automated testing and schema validation. Built attribution models and cohort analysis that exposed conversion bottlenecks - insights that optimized channel mix and improved marketing ROI. Delivered pricing optimization and demand forecasting models that became the weekly operating system for executives.',
    techStack: [
      'Microsoft Fabric',
      'Spark/dbt',
      'Power BI',
      'Attribution Modeling',
      'Marketing Analytics',
      'Data Engineering',
      'ETL Pipelines',
    ],
    date: '2024',
    metrics: [
      'Built company data dictionary & KPI catalog (CAC, CVR, demand)',
      'Automated data quality testing - MTR for data issues < 8 hours',
      'Attribution insights optimized channel mix and improved ROI',
      'Pricing models became weekly executive dashboard',
      'Schema-change alerts prevented downstream report breaks',
    ],
  },
  {
    title: 'Unified Data Platform - Cannabis Analytics (Strainprint)',
    description:
      'Architected cloud-native analytics platform unifying Strainprint\'s marketing, finance, inventory, and compliance operations. Consolidated fragmented ad platforms, CRM, web analytics, and product telemetry into a single AWS + Power BI infrastructure. Built self-serve analytics foundation with documented attribution logic and KPIs - achieved 90% self-serve adoption across 50 users. Implemented data quality monitoring and A/B testing framework with statistical rigor, enabling data-driven decisions across Marketing and Product. Set analytics roadmap aligned to business priorities: acquisition lift, churn reduction.',
    techStack: [
      'AWS',
      'Power BI',
      'Marketing Analytics',
      'Attribution Modeling',
      'A/B Testing',
      'Self-Service BI',
      'Data Quality',
    ],
    date: '2025',
    metrics: [
      'Unified marketing data foundation across all channels',
      'Documented attribution logic & KPIs with 90% self-serve adoption',
      'Reduced broken reports by 70% with quality monitoring',
      'A/B testing framework with statistical rigor',
      'Analytics agenda tied to acquisition lift & churn reduction',
    ],
  },
  {
    title: 'Multi-Touch Attribution & Experimentation - Digital Marketing',
    description:
      'Built sophisticated attribution models for HelloWorld (Merkle) serving Fortune 500 clients in digital marketing. Architected multi-touch attribution systems that quantified channel contributions across email, social, display, and search - informing media mix and budget allocation. Delivered experimentation frameworks (A/B testing, holdout analysis) to measure lift and validate marketing investments. Established data governance and privacy-compliant processes (GDPR/CCPA) while maintaining audit-ready campaigns. Translated complex analytics into executive narratives that accelerated renewals and drove strategic expansion.',
    techStack: [
      'Attribution Modeling',
      'A/B Testing',
      'Campaign Analytics',
      'Marketing Measurement',
      'Data Governance',
      'Executive Reporting',
    ],
    date: '2014-2018',
    metrics: [
      'Multi-touch attribution quantified channel contributions',
      'Experimentation frameworks measured lift and validated spend',
      'GDPR/CCPA compliant processes with audit-ready campaigns',
      'KPI storytelling accelerated renewals and expansion',
      'Led 8-15 member analytics teams for Fortune 500 clients',
    ],
  },
  {
    title: 'Real Estate Analytics Platform - Demand Forecasting & Pricing',
    description:
      'Designed predictive analytics system for real estate development company that forecasts home and land prices up to 15 years in advance. Integrated 37 disparate data sources - from school ratings and crime statistics to job growth and economic indicators - into a unified Power BI platform. Built demand forecasting and channel performance models that became the foundation for investment decisions. The system identifies high-growth markets and helps avoid poor investments by analyzing demographic trends, infrastructure development, and competitive dynamics.',
    techStack: [
      'Power BI',
      'Predictive Analytics',
      'Data Integration',
      'AWS',
      'SQL',
      'Demand Forecasting',
    ],
    date: '2024',
    metrics: [
      'Integrated 37 data sources into unified platform',
      'Forecasts property values up to 15 years in advance',
      'Identified high-ROI investment areas',
      'Channel performance models informed budget allocation',
    ],
  },
  {
    title: 'Data Consulting Practice - Snowflake & Analytics Strategy',
    description:
      'Drove operations and analytics consulting for Strainprint Technologies while building their data practice globally. Established Snowflake/Databricks + dbt foundations for campaign and revenue analytics across regions. Enabled client teams to build and operate dashboards independently, increasing self-serve adoption. Instrumented funnels, cohorts, and attribution - providing experiment-ready infrastructure for paid and organic channels. Developed conceptual and logical data models, advised on AWS cloud architecture for scale. Stood up analytics vision that became the strategic foundation for multiple client engagements.',
    techStack: [
      'Snowflake',
      'Databricks',
      'dbt',
      'Data Strategy',
      'Consulting',
      'Cloud Architecture',
    ],
    date: '2018-2021',
    metrics: [
      'Established modern data stack (Snowflake/Databricks + dbt)',
      'Campaign and revenue analytics across global regions',
      'Increased client self-serve adoption with training',
      'Funnel, cohort, and attribution instrumentation',
    ],
  },
  {
    title: 'Power BI Training System - Accelerated Developer Onboarding',
    description:
      'Created comprehensive Power BI training program for Inspire11 that reduced new developer onboarding from 2 weeks to 3 days. Built library of 20+ industry-specific templates, 20+ custom themes, and video tutorials covering semantic modeling, DAX optimization, and visualization best practices. The training system became the standard onboarding path for over 50 developers, ensuring consistent quality and accelerating time-to-productivity. Templates standardized delivery patterns and reduced project kickoff time from days to hours.',
    techStack: [
      'Power BI',
      'Training & Documentation',
      'Template Design',
      'DAX',
      'Semantic Modeling',
    ],
    date: '2021-2023',
    metrics: [
      'Onboarding cut from 2 weeks to 3 days',
      '20+ industry templates & 20+ custom themes',
      'Trained 50+ developers with consistent quality',
      'Templates accelerated project kickoff from days to hours',
    ],
  },
  {
    title: 'Azure/Power BI Integration - SME to Unified Reporting',
    description:
      'Unified fragmented ERP data for SME client (Inspire11) by consolidating into Azure/Fabric data warehouse. Designed Power BI reporting layer that enabled centralized analytics and executive dashboards. Reduced exec report cycle time from 2 weeks to 3 days by eliminating manual data collection. Authored 20+ Power BI templates and external tools that standardized delivery. Partnered with Product and Customer Success to translate feature requests into measurable data outcomes with clear success metrics.',
    techStack: [
      'Azure',
      'Power BI',
      'Microsoft Fabric',
      'Data Warehouse',
      'Executive Dashboards',
    ],
    date: '2021-2023',
    metrics: [
      'Unified fragmented ERP into centralized warehouse',
      'Executive report cycle: 2 weeks → 3 days',
      '20+ standardized Power BI templates',
      'Translated feature requests into measurable outcomes',
    ],
  },
  {
    title: 'LinkedIn Job Tracker - Personal Productivity Tool',
    description:
      'Built an intelligent job application tracker as a personal project that automatically syncs with Gmail and uses AI to score job matches. The system uses GPT-4 to extract job details from emails, compares requirements to your resume, and scores each opportunity 0-100% across skills, experience, location, and salary fit. Tracks which companies viewed your application and provides actionable insights. What used to take hours in spreadsheets now happens automatically - a practical example of using modern AI tools to solve real problems.',
    techStack: [
      'React',
      'TypeScript',
      'OpenAI GPT-4',
      'Gmail API',
      'Tailwind CSS',
    ],
    date: '2025',
    metrics: [
      '100% automated email parsing with AI',
      '4-dimensional job fit scoring (skills, experience, location, salary)',
      'Real-time application status tracking',
      'Zero manual data entry required',
    ],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/snahrup/linkedin-job-tracker',
      },
    ],
  },
];

export const data = PROJECT_CONTENT.map((project, index) => ({
  category: project.techStack[0],
  title: project.title,
  src: `/project-${index + 1}.png`,
  content: (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        {project.date && (
          <p className="text-sm text-muted-foreground mb-4">{project.date}</p>
        )}
        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>

      {project.metrics && (
        <div>
          <h4 className="font-semibold mb-2">Results</h4>
          <ul className="space-y-1">
            {project.metrics.map((metric, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start">
                <ChevronRight className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                {metric}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h4 className="font-semibold mb-2">Technologies Used</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.links && (
        <div className="flex gap-4 pt-4">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
            >
              {link.name}
              <ChevronRight className="h-3 w-3" />
            </a>
          ))}
        </div>
      )}
    </div>
  ),
}));