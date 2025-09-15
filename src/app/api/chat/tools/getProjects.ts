
import { tool } from "ai";
import { z } from "zod";

export const getProjects = tool({
  description:
    "This tool will show a list of all projects made by Steve Nahrup",
  parameters: z.object({}),
  execute: async () => {
    return `Here are my key projects! Let me tell you about them:

## 🎯 LinkedIn Job Tracker - AI-Powered Job Search Assistant
**[GitHub](https://github.com/snahrup/linkedin-job-tracker)** | Built with React, TypeScript, OpenAI GPT-4

This is my latest project - an intelligent job application tracker that's revolutionizing how people manage their job search:

• **Automatic Gmail Sync**: Imports all LinkedIn job applications automatically
• **AI Match Scoring**: Uses GPT-4 to score each job (0-100%) based on your actual resume
• **Real-time Status Tracking**: Knows when companies view your application
• **Smart Insights**: Shows response rates, timing patterns, and success metrics

The coolest part? It uses AI to extract structured data from messy emails and provides personalized recommendations for each position. Already saving job seekers hours per week!

## 🌿 Strainprint ML Pipeline - Cannabis Treatment Optimizer
**Microsoft Fabric, Machine Learning, PySpark**

Built an AI system helping 30,000+ patients find effective treatments 25% more often:

• **1.4 Million Sessions Analyzed**: Built predictive models on massive healthcare dataset
• **Real-time Recommendations**: Sub-second personalized treatment suggestions
• **3 ML Models**: Treatment predictor, recommendation engine, tolerance detector
• **Enterprise Scale**: Running on Microsoft Fabric with PySpark notebooks

This project combines my passion for data with real healthcare impact - turning patient experiences into actionable insights.

Want to know more about either project? Or curious about the technical details?`;
  },
});
