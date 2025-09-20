'use client';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface MatchDonutProps {
  percentage: number;
  size?: number;
}

export function MatchDonut({ percentage, size = 200 }: MatchDonutProps) {
  const data = [
    { name: 'Match', value: percentage, fill: '#10B981' },
    { name: 'Gap', value: 100 - percentage, fill: '#E5E7EB' }
  ];

  const getMatchLabel = () => {
    if (percentage >= 80) return 'Excellent Match';
    if (percentage >= 60) return 'Good Match';
    if (percentage >= 40) return 'Potential Match';
    return 'Limited Match';
  };

  const getMatchColor = () => {
    if (percentage >= 80) return '#10B981'; // green
    if (percentage >= 60) return '#3B82F6'; // blue
    if (percentage >= 40) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <ResponsiveContainer width={size} height={size}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={size * 0.35}
              outerRadius={size * 0.45}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold"
            style={{ color: getMatchColor() }}
          >
            {percentage}%
          </motion.div>
          <div className="text-sm text-muted-foreground">match</div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-sm font-medium"
        style={{ color: getMatchColor() }}
      >
        {getMatchLabel()}
      </motion.div>
    </motion.div>
  );
}