import { motion, AnimatePresence } from 'framer-motion';
import { FileClock, BrainCircuit, Bot, FileCog, CheckCircle } from 'lucide-react';

interface AnalysisProgressProps {
  status: string;
  progress: number;
  currentStep: string;
}

const statusConfig: { [key: string]: { icon: React.ReactNode; text: string } } = {
  ANALYZING: { icon: <FileClock className="h-8 w-8" />, text: 'Analyzing Project' },
  PROCESSING: { icon: <BrainCircuit className="h-8 w-8" />, text: 'Processing Code' },
  GENERATING: { icon: <Bot className="h-8 w-8" />, text: 'Generating Content' },
  FINALIZING: { icon: <FileCog className="h-8 w-8" />, text: 'Finalizing Document' },
  COMPLETE: { icon: <CheckCircle className="h-8 w-8 text-secondary" />, text: 'Documentation Ready!' },
};

const AnalysisProgress = ({ status, progress, currentStep }: AnalysisProgressProps) => {
  const config = statusConfig[status] || statusConfig.ANALYZING;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto bg-base-100 p-8 rounded-xl shadow-2xl text-center"
    >
      <div className="flex items-center justify-center gap-4 text-primary mb-4">
        {config.icon}
        <h2 className="text-2xl font-bold">{config.text}</h2>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 my-6 overflow-hidden">
        <motion.div
          className="bg-secondary h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-gray-600 text-lg h-6"
        >
          {currentStep}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

export default AnalysisProgress;
