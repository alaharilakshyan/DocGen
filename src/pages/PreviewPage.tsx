import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { DocumentationData } from '../types/documentation';
import { generateWordDocument } from '../services/wordGenerator';
import DocumentPreview from '../components/preview/DocumentPreview';
import { Download, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: DocumentationData | undefined = location.state?.data;

  useEffect(() => {
    if (!data) {
      // If no data is passed, redirect back to the generator
      navigate('/generator');
    }
  }, [data, navigate]);

  const handleDownload = async () => {
    if (data) {
      await generateWordDocument(data);
    }
  };

  const handleStartNew = () => {
    navigate('/generator');
  };

  if (!data) {
    // Render nothing or a loading spinner while redirecting
    return null;
  }

  return (
    <div className="bg-base-200 min-h-full">
      <header className="bg-base-100/80 backdrop-blur-sm sticky top-16 z-40 shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-base-content">Document Preview</h1>
            <p className="text-gray-600 truncate">Project: {data.projectName}</p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3">
            <button
              onClick={handleStartNew}
              className="inline-flex items-center justify-center gap-2 bg-gray-200 text-base-content px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Start New
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary/90 transition-transform hover:scale-105 shadow-md"
            >
              <Download className="h-4 w-4" />
              Download as .docx
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DocumentPreview data={data} />
        </motion.div>
      </main>
    </div>
  );
};

export default PreviewPage;
