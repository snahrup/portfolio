'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, Clock } from 'lucide-react';

interface Agent {
  name: string;
  role: string;
  icon: string;
}

interface AgentStatusProps {
  agents: Array<{
    agent: Agent;
    status: 'waiting' | 'working' | 'complete';
    message: string;
  }>;
}

export function AgentStatus({ agents }: AgentStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 rounded-xl p-6 border shadow-md"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">🤖</span>
        Analysis Agents Working
      </h3>
      
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {agents.map((item, index) => (
            <motion.div
              key={item.agent.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.2 }}
              className={`
                flex items-start gap-3 p-3 rounded-lg transition-all
                ${item.status === 'complete' 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : item.status === 'working'
                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 opacity-60'
                }
              `}
            >
              {/* Agent Icon */}
              <div className="text-2xl flex-shrink-0 mt-1">
                {item.agent.icon}
              </div>
              
              {/* Agent Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {item.agent.name}
                  </span>
                  {item.status === 'working' && (
                    <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                  )}
                  {item.status === 'complete' && (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  )}
                  {item.status === 'waiting' && (
                    <Clock className="h-3 w-3 text-gray-400" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.agent.role}
                </p>
                {item.message && (
                  <p className="text-sm mt-1 font-medium">
                    {item.message}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(agents.filter(a => a.status === 'complete').length / agents.length) * 100}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {agents.filter(a => a.status === 'complete').length} of {agents.length} agents complete
        </p>
      </div>
    </motion.div>
  );
}
