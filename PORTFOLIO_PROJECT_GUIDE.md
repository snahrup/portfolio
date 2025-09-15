# Portfolio Project Addition Guide

## Quick Reference for Adding New Projects to Steve Nahrup's Portfolio

**Repository:** `C:\Users\steve\CascadeProjects\portfolio` | GitHub: `snahrup/portfolio`

---

## Step-by-Step Process

### 1. Add Project to Data Array
**File:** `src/components/projects/Data.tsx`

Add new project as FIRST item in `PROJECT_CONTENT` array (projects display in order):

```javascript
const PROJECT_CONTENT = [
  {
    title: 'Project Name - Catchy Tagline',
    description: 'Plain English description focusing on business value. Use analogies. Explain the problem, solution, and impact in terms anyone can understand.',
    techStack: [
      'Primary Tech',  // This becomes the category badge
      'Tech 2',
      'Tech 3',
      // ... more technologies
    ],
    date: '2025',  // Optional - will only display if provided
    metrics: [
      'Quantifiable impact statement',
      'Performance metric',
      'User/business benefit',
      'Time/cost savings',
      // 4-5 metrics ideal
    ],
    links: [  // Optional
      {
        name: 'GitHub',
        url: 'https://github.com/snahrup/repo-name',
      },
      {
        name: 'Live Demo',
        url: 'https://demo-url.com',
      },
    ],
  },
  // ... existing projects follow
];
```

### 2. Add Project Image
**Location:** `public/` folder

- Copy project screenshot to `public/project-1.png` (if added as first project)
- All subsequent projects shift: `project-2.png`, `project-3.png`, etc.
- Images should be dashboard/main screen captures
- Recommended: Dark theme screenshots for better text overlay contrast

**Quick command:**
```bash
copy "path\to\screenshot.png" "C:\Users\steve\CascadeProjects\portfolio\public\project-1.png"
```

### 3. Update Chat Interface Questions
**File:** `src/components/chat/HelperBoost.tsx`

Add to special questions (line ~54):
```javascript
const specialQuestions = [
  'Tell me about your [New Project Name]',  // Add project-specific question
  // ... existing questions
];
```

Add to projects category (line ~89):
```javascript
{
  id: 'projects',
  name: 'Projects',
  icon: CodeIcon,
  questions: [
    'What projects are you most proud of?',
    'Tell me about your [New Project Name]',  // Add here too
    // ... existing questions
  ],
},
```

### 4. Update Projects Tool Response
**File:** `src/app/api/chat/tools/getProjects.ts`

Add project description to the return statement:
```javascript
return `Here are my key projects! Let me tell you about them:

## 🎯 [New Project Name] - [Tagline]
**[GitHub](link)** | Built with [Tech Stack]

[2-3 sentence description focusing on impact and innovation]

• **Key Feature 1**: Description
• **Key Feature 2**: Description
• **Key Feature 3**: Description
• **Key Feature 4**: Description

[Impact statement - metrics, users helped, time saved, etc.]

// ... existing projects follow
`;
```

### 5. Add Project README (Optional)
**Location:** `projects/[project-name]/README.md`

Create comprehensive documentation following this structure:
- What We Built
- The Problem We Solved (Before/After)
- How It Works (Plain English)
- Real Impact (Metrics)
- Technology Details
- What Makes This Special
- Bottom Line

---

## Commit Template
```bash
git add -A
git commit -m "Add [Project Name] to portfolio

- Added to project carousel as featured project
- Included comprehensive metrics and tech stack
- Added AI chat responses and special questions
- Dashboard screenshot for visual presentation
- [Any special features highlighted]"
git push origin main
```

---

## Key Files Reference
1. **Project Data:** `src/components/projects/Data.tsx` - Main project array
2. **Chat Questions:** `src/components/chat/HelperBoost.tsx` - Interactive questions
3. **AI Responses:** `src/app/api/chat/tools/getProjects.ts` - Chat bot project descriptions
4. **Images:** `public/project-[n].png` - Project screenshots (numbered sequentially)
5. **Documentation:** `projects/[name]/README.md` - Detailed project docs

---

## Important Notes
- **Order Matters:** First project in array = `project-1.png`, displays first in carousel
- **Tech Stack[0]:** First technology becomes the category badge on the card
- **Conditional Fields:** Only `title`, `description`, and `techStack` are required
- **Image Naming:** Must match index position (`project-${index + 1}.png`)
- **Plain English:** All descriptions should be understandable by non-technical recruiters
- **Impact Focus:** Emphasize business value, time saved, problems solved

---

## Quick Checklist
- [ ] Added to `PROJECT_CONTENT` array in Data.tsx
- [ ] Added project image as `project-[n].png`
- [ ] Updated HelperBoost.tsx with project questions
- [ ] Updated getProjects.ts with AI response
- [ ] Created project README (optional)
- [ ] Committed with descriptive message
- [ ] Pushed to GitHub

---

## Example: LinkedIn Job Tracker Addition

### Data.tsx Entry:
```javascript
{
  title: 'LinkedIn Job Tracker - AI-Powered Job Search Assistant',
  description: 'Built an intelligent job application tracker that automatically syncs with Gmail and uses AI to score job matches...',
  techStack: ['React', 'TypeScript', 'OpenAI GPT-4', 'Gmail API', 'Tailwind CSS'],
  date: '2025',
  metrics: [
    '100% automated email parsing',
    'AI match scoring in < 1 second',
    '4-dimensional scoring system',
    'Real-time status tracking',
  ],
  links: [
    { name: 'GitHub', url: 'https://github.com/snahrup/linkedin-job-tracker' },
  ],
}
```

This guide ensures consistent, professional project additions that showcase both technical excellence and business impact.
