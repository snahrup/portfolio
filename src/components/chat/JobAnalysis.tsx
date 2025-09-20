'use client';
import { motion } from 'framer-motion';
import { MatchDonut } from './charts/MatchDonut';
import { SkillsBars } from './charts/SkillsBars';
import { SimpleRadar } from './charts/SimpleRadar';
import { AlertCircle, CheckCircle, TrendingUp, Briefcase } from 'lucide-react';

interface JobAnalysisProps {
  data: {
    type?: string;
    error?: string;
    tip?: string;
    overall_match?: number;
    skills_match?: Array<{
      name: string;
      required: number;
      yours: number;
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

  return (
    <div className="space-y-6">
      {/* Overall Match Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-lg p-6 border"
      >
        <h3 className="text-lg font-semibold mb-4">Overall Compatibility</h3>
        <MatchDonut percentage={data.overall_match} />
      </motion.div>

      {/* Skills Match */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-lg p-6 border"
      >
        <h3 className="text-lg font-semibold mb-4">Top Skills Alignment</h3>
        <SkillsBars skills={data.skills_match} />
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-lg p-6 border"
      >
        <h3 className="text-lg font-semibold mb-4">Competency Breakdown</h3>
        <SimpleRadar data={data.radar_data} />
      </motion.div>

      {/* Strengths & Gaps */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-lg p-6 border"
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Key Strengths
          </h3>
          <ul className="space-y-2">
            {data.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <div>
                  <span className="font-medium">{highlight.name}</span>
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
          transition={{ delay: 0.7 }}
          className="bg-card rounded-lg p-6 border"
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <TrendingUp className="h-5 w-5 text-amber-500" />
            Growth Opportunities
          </h3>
          <ul className="space-y-2">
            {data.gaps.map((gap, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <div>
                  <span className="font-medium">{gap.name}</span>
                  <span className="text-sm text-muted-foreground block">
                    {gap.category}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Relevant Projects */}
      {data.relevant_projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card rounded-lg p-6 border"
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Briefcase className="h-5 w-5 text-blue-500" />
            Relevant Portfolio Projects
          </h3>
          <div className="space-y-2">
            {data.relevant_projects.map((project, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-3 bg-muted/50 rounded-md"
              >
                <span className="text-blue-500">→</span>
                <span>{project}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg p-6 border"
      >
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
          <AlertCircle className="h-5 w-5 text-blue-500" />
          My Honest Assessment
        </h3>
        <p className="text-foreground/90 leading-relaxed">
          {data.recommendation}
        </p>
      </motion.div>
    </div>
  );
}