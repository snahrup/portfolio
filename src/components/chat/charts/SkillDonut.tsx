'use client';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SkillDonutProps {
  name: string;
  percentage: number;
  delay?: number;
}

export function SkillDonut({ name, percentage, delay = 0 }: SkillDonutProps) {
  const data = [
    { value: percentage, fill: getColor(percentage) },
    { value: 100 - percentage, fill: '#E5E7EB' }
  ];

  function getColor(percent: number) {
    if (percent >= 100) return '#10B981'; // green
    if (percent >= 80) return '#3B82F6';  // blue
    if (percent >= 60) return '#F59E0B';  // amber
    return '#EF4444'; // red
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center space-y-2"
    >
      <div className="relative">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              animationBegin={delay * 1000}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: getColor(percentage) }}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-center px-2 line-clamp-2">
        {name}
      </span>
    </motion.div>
  );
}
