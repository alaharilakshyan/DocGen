import UrlInputForm from '../components/generator/UrlInputForm';
import AnalysisProgress from '../components/generator/AnalysisProgress';
import HistoryPanel from '../components/generator/HistoryPanel';
import useDocumentationGenerator from '../hooks/useDocumentationGenerator';
import { AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const GeneratorPage = () => {
  const { 
    status, 
    progress, 
    currentStep, 
    error, 
    url, 
    setUrl,
    history,
    startGeneration, 
    reset,
    removeFromHistory,
    clearHistory,
  } = useDocumentationGenerator();

  const handleFormSubmit = () => {
    startGeneration(url);
  };

  const handleReset = () => {
    reset();
    setUrl(''); // Clear URL when starting a completely new one
  }

  const handleRunFromHistory = (itemUrl: string) => {
    setUrl(itemUrl);
    startGeneration(itemUrl);
  }

  const renderContent = () => {
    switch (status) {
      case 'IDLE':
      case 'ERROR':
        return <UrlInputForm url={url} setUrl={setUrl} onSubmit={handleFormSubmit} isLoading={status !== 'IDLE' && status !== 'ERROR'} />;
      default:
        return <AnalysisProgress status={status} progress={progress} currentStep={currentStep} />;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold">Documentation Generator</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Paste your project's URL below and let our AI create a professional, submission-ready report for you.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div 
            key={status}
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 flex items-center justify-center gap-2 bg-red-100 text-red-700 p-4 rounded-lg max-w-2xl mx-auto"
            >
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <HistoryPanel 
          history={history}
          onRun={handleRunFromHistory}
          onRemove={removeFromHistory}
          onClear={clearHistory}
          isProcessing={status !== 'IDLE' && status !== 'ERROR'}
        />
      </div>
    </div>
  );
};

export default GeneratorPage;
