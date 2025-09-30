'use client';

import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import { GithubButton } from '@/components/ui/github-button';
import WelcomeModal from '@/components/welcome-modal';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  UserRoundSearch,
  Target,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/* ---------- quick-question data ---------- */
const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Contact: 'How can I contact you?',
  JobFit: '🎯 Analyze my fit for your job - paste the job description or URL here!'
} as const;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
  { key: 'JobFit', color: '#EF4444', icon: Target },
] as const;

/* ---------- component ---------- */
export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const goToChat = (query: string) =>
    router.push(`/chat?query=${encodeURIComponent(query)}`);

  /* hero animations */
  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'ease', duration: 0.8 },
    },
  };
  const bottomElementVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'ease', duration: 0.8, delay: 0.2 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  useEffect(() => {
    // Preload chat assets
    const img = new window.Image();
    img.src = '/steve-profile.jpg';
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 md:py-20">
      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          Nahrup
        </div>
      </div>

      {/* GitHub button */}
      <div className="absolute top-6 right-8 z-20">
        <GithubButton
          animationDuration={1.5}
          label="Star"
          size={'sm'}
          repoUrl="https://github.com/snahrup/portfolio"
        />
      </div>

      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => goToChat('Tell me about your BI & Analytics expertise')}
          className="relative flex cursor-pointer items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          {/* Green pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Open for Opportunities
        </button>
      </div>

      {/* Main Content Container */}
      <div className="z-10 w-full max-w-4xl mx-auto">
        {/* Profile Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12"
          variants={topElementVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image */}
          <motion.div
            className="flex-shrink-0"
            variants={imageVariants}
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/10">
              <Image
                src="/steve-profile.jpg"
                alt="Steve Nahrup"
                width={224}
                height={224}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Steve Nahrup
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-1">
                Business Intelligence Architect & Data Analytics Leader
              </p>
              <p className="text-sm text-muted-foreground">
                Charleston, SC
              </p>
            </div>

            <div className="mb-6">
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Hey 👋
                <br />
                I'm Steve Nahrup, a seasoned BI architect with 14+ years building enterprise analytics platforms. 
                I specialize in transforming fragmented data into governed insights through enterprise BI architecture, 
                marketing analytics, and data engineering. I've led teams of 8-15 building Power BI semantic models, 
                multi-touch attribution systems, and cloud data platforms at scale.
              </p>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {['Power BI', 'Microsoft Fabric', 'Marketing Analytics', 'Attribution Modeling', 'Data Engineering'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium bg-accent text-accent-foreground rounded-full border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Input + Quick Buttons */}
        <motion.div
          variants={bottomElementVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center justify-center"
        >
          {/* Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) goToChat(input.trim());
            }}
            className="relative w-full max-w-2xl mb-6"
          >
            <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600 shadow-lg">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Submit question"
                className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Quick Question Buttons */}
          <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-5">
            {questionConfig.map(({ key, color, icon: Icon }) => (
              <Button
                key={key}
                onClick={() => goToChat(questions[key])}
                variant="outline"
                className={`
                  border-border hover:bg-border/30 aspect-square w-full cursor-pointer rounded-2xl border py-8 shadow-none backdrop-blur-lg active:scale-95 md:p-10 relative overflow-visible
                  ${key === 'JobFit' 
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 dark:from-red-950/30 dark:to-orange-950/30 dark:hover:from-red-900/30 dark:hover:to-orange-900/30 ring-2 ring-red-200 dark:ring-red-800 animate-pulse-subtle' 
                    : 'bg-white/30'
                  }
                `}
              >
                {key === 'JobFit' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg"
                  >
                    NEW
                  </motion.div>
                )}
                <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
                  <Icon size={22} strokeWidth={2} color={color} />
                  <span className={`text-xs font-medium sm:text-sm ${key === 'JobFit' ? 'font-bold' : ''}`}>
                    {key === 'JobFit' ? 'Job Fit' : key}
                  </span>
                  {key === 'JobFit' && (
                    <span className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5">AI Analysis</span>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>

      <FluidCursor />
    </div>
  );
}