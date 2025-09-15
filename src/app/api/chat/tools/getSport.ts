
import { tool } from "ai";
import { z } from "zod";


export const getSports = tool({
  description:
    "This tool will show some photos of Steve doing sports and outdoor activities",
  parameters: z.object({}),
  execute: async () => {
    return "Here are some great shots of me enjoying the outdoors! While I'm passionate about data and AI, I also love staying active and exploring nature around Charleston, SC. Balance is key to creativity and problem-solving!";
  },
});
