import Image from 'next/image';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Steve Nahrup's projects
const PROJECT_CONTENT = [
  {
    title: 'LinkedIn Job Tracker - AI-Powered Job Search Assistant',
    description:
      'Built an intelligent job application tracker that automatically syncs with Gmail and uses AI to score job matches. It\'s like having a personal job search assistant that never forgets. The system uses GPT-4 to extract job details from emails, compares requirements to your actual resume, and scores each opportunity 0-100%. Tracks which companies viewed your application, average response times, and provides actionable insights. What used to take hours in spreadsheets now happens automatically with AI-powered insights.',
    techStack: [
      'React',
      'TypeScript',
      'OpenAI GPT-4',
      'Gmail API',
      'Tailwind CSS',
      'Zustand',
      'Vite',
    ],
    date: '2025',
    metrics: [
      '100% automated email parsing',
      'AI match scoring in < 1 second',
      '4-dimensional scoring (skills, experience, location, salary)',
      'Real-time status tracking',
      'Zero manual data entry required',
    ],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/snahrup/linkedin-job-tracker',
      },
      {
        name: 'Live Demo',
        url: '#',
      },
    ],
  },
  {
    title: 'Cannabis Treatment Optimizer - Helping Patients Find What Works',
    description:
      'Built an AI system that helps medical cannabis patients find the right treatment faster. Think of it like Netflix recommendations, but for medical treatments. The system learned from 1.4 million real patient experiences to predict which cannabis strains will work best for each person\'s specific symptoms. Before this, patients had to try dozens of products through trial and error - now they get personalized recommendations instantly. The result? Patients found effective treatments 25% more often and avoided products that wouldn\'t help them.',
    techStack: [
      'Microsoft Fabric',
      'Machine Learning',
      'Data Analytics',
      'Power BI',
      'Python',
      'Cloud Computing',
      'Real-time Processing',
    ],
    date: '2025',
    metrics: [
      'Analyzed 1.4 million patient treatment sessions',
      'Helped 30,000+ patients find better treatments',
      '25% more patients found relief',
      'Recommendations delivered in under 1 second',
      'Saves patients weeks of trial and error',
    ],
    links: [
      {
        name: 'Technical Details',
        url: 'https://github.com/snahrup/portfolio/tree/main/projects/strainprint-ml-pipeline',
      },
    ],
  },
  {
    title: 'AI Assistant for Cannabis Business Operations',
    description:
      'Created an AI assistant that handles repetitive tasks for a cannabis analytics company. It\'s like having a super-smart intern that never sleeps. The AI answers customer questions, manages inventory levels, sends alerts when products run low, and creates reports automatically. What used to take employees hours now happens instantly, letting the team focus on helping customers instead of paperwork.',
    techStack: [
      'OpenAI',
      'Automation',
      'n8n Workflows',
      'Cloud Services',
      'APIs',
      'Python',
    ],
    date: '2024-2025',
    metrics: [
      'Cut manual work by 40%',
      'Tasks that took days now take hours',
      '90% of employees using the self-service tools',
      'Prevented product shortages',
    ],
  },
  {
    title: 'Real Estate Price Predictor for Home Builders',
    description:
      'Built a system that predicts future home and land prices for a real estate development company. It\'s like having a crystal ball for property values. The system combines data from 37 different sources - everything from school ratings to crime statistics to job growth - and predicts what properties will be worth 5, 10, even 15 years from now. This helps the company buy land in areas that will grow in value and avoid areas that won\'t.',
    techStack: [
      'Power BI',
      'Cloud Databases',
      'Data Integration',
      'Predictive Analytics',
      'AWS',
      'SQL',
    ],
    date: '2024',
    metrics: [
      'Combined data from 37 different sources',
      'Predicts prices up to 15 years in advance',
      'Helped identify best investment areas',
      'Saved millions in poor investments',
    ],
  },
  {
    title: 'Data System Overhaul at Fortune 500 Consulting Firm',
    description:
      'Led the complete rebuild of data systems for Senturus, a major consulting firm. Imagine trying to find information when it\'s scattered across 30 different filing cabinets - that was their problem. I built a single, organized system where everyone could find what they needed instantly. Set up proper security so people only see what they\'re allowed to see, and made sure the data was always accurate and up-to-date.',
    techStack: [
      'Microsoft Fabric',
      'Enterprise Data Systems',
      'Security',
      'Cloud Architecture',
      'Power BI',
    ],
    date: '2023-2024',
    metrics: [
      'Combined 30 scattered systems into one',
      'Single source of truth for entire company',
      'Enterprise-grade security implemented',
      'Used by Finance, Sales, and Operations teams',
    ],
  },
  {
    title: 'AI Tool That Connects Claude to Business Data',
    description:
      'Created a tool that lets Claude (the AI assistant) directly access and analyze business data in Microsoft systems. It\'s like giving Claude the keys to your company\'s data warehouse. Instead of manually pulling reports and copying data, you can just ask Claude questions in plain English and get instant answers with live data. This turned hours of report-building into simple conversations.',
    techStack: [
      'TypeScript',
      'Microsoft Fabric',
      'APIs',
      'Claude AI',
      'Power BI',
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/snahrup/microsoft-fabric-mcp',
      },
    ],
    metrics: [
      'Reduced report creation time by 60%',
      'Talk to your data in plain English',
      'No more manual data exports',
    ],
  },
  {
    title: 'Memory System for AI Conversations',
    description:
      'Built a system that gives Claude AI a "memory" between conversations. Normally, AI assistants forget everything when you start a new chat. This tool saves important context and project details, so you can pick up where you left off days later. It\'s like having a notebook that Claude automatically maintains for every project you work on together.',
    techStack: [
      'TypeScript',
      'Notion',
      'Database Systems',
      'Claude AI',
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/snahrup/claude-context-system',
      },
    ],
    metrics: [
      'Never lose conversation context again',
      'Seamlessly continue projects across sessions',
      'Automatic project organization',
    ],
  },
  {
    title: 'Training System That Cut Onboarding from 2 Weeks to 3 Days',
    description:
      'Created a comprehensive training system for Power BI developers at Inspire11. New hires used to need 2 weeks of training before they could start real work. I built a library of templates, pre-made designs, video tutorials, and practice exercises that got them productive in just 3 days. It\'s like the difference between reading a car manual cover-to-cover versus having someone show you exactly what you need to know to start driving.',
    techStack: [
      'Power BI',
      'Training Materials',
      'Documentation',
      'Template Design',
    ],
    date: '2021-2023',
    metrics: [
      'Training time cut from 2 weeks to 3 days',
      'Created 20+ industry-specific templates',
      'Built 20+ custom themes',
      'Trained over 50 developers',
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