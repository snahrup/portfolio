import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Steve Nahrup. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Steve Nahrup, a Business Intelligence & AI Leader with 14+ years of enterprise experience. Based in Charleston, SC, I specialize in transforming fragmented data into strategic assets. Currently consulting as AI Automation Architect at Strainprint Technologies, I've led teams of 15+, reduced manual processes by 40%, and built predictive models that drive real business outcomes. I'm passionate about bridging the gap between technical complexity and business value.",
    };
  },
});
