import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface UrlInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const UrlInputForm = ({ url, setUrl, onSubmit, isLoading }: UrlInputFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="bg-base-100 p-8 rounded-xl shadow-2xl">
        <label htmlFor="project-url" className="block text-lg font-semibold text-center mb-4">
          Enter Your Hosted Project URL
        </label>
        <div className="relative">
          <input
            id="project-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-project.com"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 disabled:bg-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg disabled:bg-primary/50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? 'Analyzing...' : 'Document It'}
          {!isLoading && <ArrowRight className="h-5 w-5" />}
        </button>
      </form>
    </motion.div>
  );
};

export default UrlInputForm;
