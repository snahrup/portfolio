'use client';
import { motion } from 'framer-motion';
import { MatchDonut } from './charts/MatchDonut';
import { SkillDonut } from './charts/SkillDonut';
import { SimpleRadar } from './charts/SimpleRadar';
import { 
  AlertCircle, CheckCircle, TrendingUp, Briefcase, 
  Target, ChevronRight, Sparkles, AlertTriangle 
} from 'lucide-react';

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
    if (data.overall_match! >= 80) return { 
      text: 'Excellent Match!', 
      color: 'from-green-500 to-emerald-500',
      bg: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
      icon: '🎯'
    };
    if (data.overall_match! >= 60) return { 
      text: 'Good Match', 
      color: 'from-blue-500 to-cyan-500',
      bg: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
      icon: '✨'
    };
    if (data.overall_match! >= 40) return { 
      text: 'Partial Match', 
      color: 'from-amber-500 to-orange-500',
      bg: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
      icon: '🔄'
    };
    return { 
      text: 'Limited Match', 
      color: 'from-red-500 to-pink-500',
      bg: 'from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30',
      icon: '📊'
    };
  };

  const matchStatus = getMatchStatus();

  return (
    <div className="space-y-4">
      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-br ${matchStatus.bg} rounded-xl p-6 border shadow-lg`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">{matchStatus.icon}</span>
              {matchStatus.text}
            </h2>
            <p className="text-muted-foreground mt-1">
              Based on my analysis of the role requirements
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold bg-gradient-to-r ${matchStatus.color} bg-clip-text text-transparent">
              {data.overall_match}%
            </div>
            <p className="text-sm text-muted-foreground">Overall Match</p>
          </div>
        </div>
      </motion.div>

      {/* Skills Match Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl p-6 border shadow-md"
      >
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          My Top Matching Skills
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.skills_match.map((skill, i) => (
            <SkillDonut 
              key={skill.name}
              name={skill.name}
              percentage={Math.min((skill.mine / skill.required) * 100, 100)}
              delay={i * 0.1}
            />
          ))}
        </div>
      </motion.div>

      {/* Competency Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 rounded-xl p-6 border shadow-md"
      >
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          Competency Coverage
        </h3>
        <SimpleRadar data={data.radar_data} />
      </motion.div>

      {/* Strengths & Growth Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Strengths Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20 rounded-xl p-6 border shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">My Strong Matches</h3>
          </div>
          <div className="space-y-3">
            {data.highlights.map((highlight, i) => (
              <div key={i} className="bg-white/60 dark:bg-black/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{highlight.name}</p>
                    {highlight.note && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {highlight.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Growth Areas Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 rounded-xl p-6 border shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold">Areas I'd Learn</h3>
          </div>
          <div className="space-y-3">
            {data.gaps.map((gap, i) => (
              <div key={i} className="bg-white/60 dark:bg-black/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{gap.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {gap.category} skill to develop
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Relevant Projects */}
      {data.relevant_projects && data.relevant_projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-xl p-6 border shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Briefcase className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">My Relevant Work</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {data.relevant_projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="bg-white/60 dark:bg-black/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded">
                    <span className="text-sm font-bold text-purple-600">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                  <span className="font-medium text-sm">{project}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Final Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white rounded-xl p-6 shadow-xl"
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold">My Assessment</h3>
        </div>
        <p className="leading-relaxed text-gray-100">
          {data.recommendation}
        </p>
      </motion.div>
    </div>
  );
}
