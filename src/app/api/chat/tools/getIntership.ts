import { tool } from 'ai';
import { z } from 'zod';

export const getIntership = tool({
  description:
    'This tool will provide information about opportunities Steve is looking for',
  parameters: z.object({}),
  execute: async () => {
    return `# 🚀 Looking for Leadership Opportunities

Here's what I'm seeking in my next role:

- 📅 **Availability**: Immediate - ready to start now
- 🌍 **Location**: Charleston, SC preferred, open to remote or relocation for the right opportunity
- 🧑‍💻 **Focus**: BI/AI Leadership, Data Transformation, Enterprise Analytics
- 🛠️ **Stack**: Power BI, Microsoft Fabric, Python, Azure, OpenAI, LangChain, RAG systems
- 💼 **Seniority**: Director/VP level positions in Data, BI, or AI
- ✅ **What I bring**: 14+ years enterprise BI experience, proven team leadership (15+ people), successful AI implementations, reduced manual processes by 40% recently
- 🔥 **Sweet spot**: Organizations ready to transform their data into competitive advantage

📬 **Contact me** via:
- Email: steve.a.nahrup@gmail.com
- LinkedIn: [linkedin.com/in/steve-nahrup](https://www.linkedin.com/in/steve-nahrup)
- GitHub: [github.com/snahrup](https://github.com/snahrup)
- Phone: (312) 350-6854

Let's transform your data into strategic assets together! 💪
    `;
  },
});
