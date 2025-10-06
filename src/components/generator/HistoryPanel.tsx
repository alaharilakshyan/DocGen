import { AnalysisHistoryItem } from '../../types/documentation';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, RefreshCw, X } from 'lucide-react';

interface HistoryPanelProps {
  history: AnalysisHistoryItem[];
  onRun: (url: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  isProcessing: boolean;
}

const HistoryPanel = ({ history, onRun, onRemove, onClear, isProcessing }: HistoryPanelProps) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-16 w-full"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <History className="h-6 w-6" />
          Recent Analyses
        </h2>
      </div>
      <div className="bg-base-100 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
        <ul className="space-y-3">
          <AnimatePresence>
            {history.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                className="flex flex-col sm:flex-row items-center justify-between p-3 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors"
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="font-semibold text-primary truncate">{item.projectName}</p>
                  <p className="text-sm text-gray-500 truncate">{item.url}</p>
                  <p className="text-xs text-gray-400 sm:hidden">{item.date}</p>
                </div>
                <p className="text-sm text-gray-500 hidden sm:block mx-4">{item.date}</p>
                <div className="flex-shrink-0 flex items-center gap-2">
                  <button 
                    onClick={() => onRun(item.url)} 
                    disabled={isProcessing}
                    className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Re-generate"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => onRemove(item.id)} 
                    disabled={isProcessing}
                    className="p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {history.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-right">
            <button
              onClick={onClear}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              Clear All History
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HistoryPanel;
