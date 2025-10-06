import { motion } from 'framer-motion';
import { Download, RotateCcw } from 'lucide-react';

interface DownloadSectionProps {
  onDownload: () => void;
  onReset: () => void;
}

const DownloadSection = ({ onDownload, onReset }: DownloadSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full max-w-2xl mx-auto bg-base-100 p-8 rounded-xl shadow-2xl text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.7 }}
        className="h-24 w-24 mx-auto bg-secondary/10 rounded-full flex items-center justify-center"
      >
        <Download className="h-12 w-12 text-secondary" />
      </motion.div>
      <h2 className="text-3xl font-bold mt-6">Your Document is Ready!</h2>
      <p className="text-gray-600 mt-2 mb-8">
        A professional, comprehensive Word document has been generated based on your project.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary/90 transition-transform hover:scale-105 shadow-lg"
        >
          <Download className="h-5 w-5" />
          Download Report
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 bg-gray-200 text-base-content px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          <RotateCcw className="h-5 w-5" />
          Start New
        </button>
      </div>
    </motion.div>
  );
};

export default DownloadSection;
