
import { tool } from "ai";
import { z } from "zod";

export const getProjects = tool({
  description:
    "This tool will show a list of all projects made by Steve Nahrup",
  parameters: z.object({}),
  execute: async () => {
    return `Here are my key projects showcasing BI architecture and data analytics expertise:

## 🏢 Enterprise BI Architecture - Fortune 500 Consulting (Senturus)
**Microsoft Fabric, Power BI, Azure**

Led complete rebuild of enterprise analytics infrastructure for a major consulting firm:

• **Unified 30+ Data Sources**: Consolidated fragmented systems into single source of truth
• **Enterprise Governance**: Implemented RLS security, CI/CD, and data contracts
• **Semantic Models**: Built reusable data models powering Finance, Sales, Marketing, Operations
• **Quality First**: Reduced deployment errors 70% with automated testing and monitoring

This wasn't just dashboards - it was building the data backbone powering business decisions across the entire organization.

## 📊 Marketing Analytics Platform - Home Services (Maymont)
**Microsoft Fabric, Spark/dbt, Power BI**

Built comprehensive marketing analytics foundation from the ground up:

• **Unified Marketing Data**: Consolidated ad platforms, CRM, web analytics into actionable insights
• **Attribution Models**: Multi-touch attribution showing channel contributions and ROI
• **Quality Monitoring**: Automated testing caught data issues in hours, not days (< 8hr MTTR)
• **Executive Dashboards**: Pricing models and demand forecasts became weekly operating system

Created the analytics infrastructure that drives marketing decisions and budget allocation.

## 🎯 Multi-Touch Attribution - Digital Marketing (HelloWorld/Merkle)
**Attribution Modeling, A/B Testing, Campaign Analytics**

Built sophisticated attribution models for Fortune 500 clients:

• **Channel Attribution**: Quantified email, social, display, search contributions to conversions
• **Experimentation**: A/B testing and holdout analysis validated marketing investments
• **GDPR/CCPA Compliant**: Maintained audit-ready campaigns with privacy controls
• **Executive Storytelling**: Translated analytics into narratives that drove renewals and expansion

Led 8-15 member analytics teams delivering measurement frameworks for digital marketing campaigns.

## 🏗️ Unified Data Platform - Cannabis Analytics (Strainprint)
**AWS, Power BI, Marketing Analytics**

Architected cloud-native platform unifying marketing, finance, inventory, and compliance:

• **Self-Service Analytics**: 90% adoption across 50 users - documented metrics and KPIs
• **Marketing Attribution**: Built attribution logic optimizing channel mix and spend
• **Quality Framework**: Monitors prevented broken reports, catching schema changes early
• **A/B Testing**: Statistical rigor for Marketing and Product experimentation

Set analytics roadmap tied to acquisition lift, churn reduction, and operational efficiency.

Want to dive deeper into any of these projects? Or curious about specific BI/analytics challenges I've solved?`;
  },
});
