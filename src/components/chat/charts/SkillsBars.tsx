'use client';
import { motion } from 'framer-motion';

interface SkillMatch {
  name: string;
  required: number;
  yours: number;
}

interface SkillsBarsProps {
  skills: SkillMatch[];
}

export function SkillsBars({ skills }: SkillsBarsProps) {
  const getBarColor = (percentage: number) => {
    if (percentage >= 100) return '#10B981'; // green
    if (percentage >= 70) return '#3B82F6'; // blue
    if (percentage >= 40) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  return (
    <div className="w-full space-y-3">
      {skills.map((skill, index) => {
        const percentage = Math.min((skill.yours / skill.required) * 100, 100);
        const color = getBarColor(percentage);

        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-1"
          >
            <div className="flex justify-between text-sm">
              <span className="font-medium">{skill.name}</span>
              <span className="text-muted-foreground">
                {percentage >= 100 ? '✓' : `${Math.round(percentage)}%`}
              </span>
            </div>
            
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1 + 0.2,
                  ease: 'easeOut'
                }}
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}