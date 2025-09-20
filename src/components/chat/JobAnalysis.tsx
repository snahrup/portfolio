'use client';
import { motion } from 'framer-motion';
import { MatchDonut } from './charts/MatchDonut';
import { SkillsBars } from './charts/SkillsBars';
import { SimpleRadar } from './charts/SimpleRadar';
import { AlertCircle, CheckCircle, TrendingUp, Briefcase, Target, ChevronRight } from 'lucide-react';

interface JobAnalysisProps {
  data: {
    type?: string;
    error?: string;
    tip?: string;
    overall_match?: number;
    skills_match?: Array<{
      name: string;
      required: number;
      mine: number;
    }>;
    radar_data?: Array<{
      category: string;
      value: number;
      fullMark: number;
    }>;
    gaps?: Array<{
      name: string;
      category: string;
      severity: string;
    }>;
    highlights?: Array<{
      name: string;
      category: string;
      strength: number;
      note?: string;
    }>;
    recommendation?: string;
    relevant_projects?: string[];
  };
}

export function JobAnalysis({ data }: JobAnalysisProps) {
  // Handle error case
  if (data.error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <p className="text-red-800 dark:text-red-200 font-medium">{data.error}</p>
            {data.tip && (
              <p className="text-red-600 dark:text-red-300 text-sm mt-2">{data.tip}</p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Ensure we have required data
  if (!data.overall_match || !data.skills_match || !data.radar_data) {
    return null;
  }

  // Get match status for header
  const getMatchStatus = () => {
    if (data.overall_match! >= 80) return { text: 'Excellent Match', color: 'text-green-600' };
    if (data.overall_match! >= 60) return { text: 'Good Match', color: 'text-blue-600' };
    if (data.overall_match! >= 40) return { text: 'Partial Match', color: 'text-amber-600' };
    return { text: 'Limited Match', color: 'text-red-600' };
  };

  const matchStatus = getMatchStatus();

  return (
    <div className="space-y-6">
      {/* Header with Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 rounded-lg p-6 border"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-500" />
            Job Fit Analysis
          </h2>
          <span className={`font-semibold ${matchStatus.color}`}>
            {matchStatus.text}
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex justify-center">
            <MatchDonut percentage={data.overall_match} size={160} />
          </div>
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">MY TOP MATCHING SKILLS</h3>
            <SkillsBars skills={data.skills_match.slice(0, 3)} />
          </div>
        </div>
      </motion.div>

      {/* Competency Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-lg p-6 border"
      >
        <h3 className="text-lg font-semibold mb-4">Competency Analysis</h3>
        <SimpleRadar data={data.radar_data} />
      </motion.div>

      {/* Strengths & Growth Side by Side */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-6 border"
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            My Strengths for This Role
          </h3>
          <ul className="space-y-3">
            {data.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-medium text-foreground">{highlight.name}</span>
                  {highlight.note && (
                    <span className="text-sm text-muted-foreground block">
                      {highlight.note}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-6 border"
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <TrendingUp className="h-5 w-5 text-amber-600" />
            Areas I'd Develop
          </h3>
          <ul className="space-y-3">
            {data.gaps.map((gap, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-medium text-foreground">{gap.name}</span>
                  <span className="text-sm text-muted-foreground block capitalize">
                    {gap.category} Skill
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Relevant Projects */}
      {data.relevant_projects && data.relevant_projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-lg p-6 border"
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Briefcase className="h-5 w-5 text-blue-500" />
            My Relevant Portfolio Projects
          </h3>
          <div className="grid md:grid-cols-3 gap-3">
            {data.relevant_projects.map((project, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="font-medium text-sm">{project}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Final Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 rounded-lg p-6 border"
      >
        <h3 className="text-lg font-semibold mb-3">My Assessment</h3>
        <p className="text-foreground leading-relaxed">
          {data.recommendation}
        </p>
      </motion.div>
    </div>
  );
}
