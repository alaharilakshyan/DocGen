import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProcessingStatus, AnalysisHistoryItem } from '../types/documentation';
import * as apiService from '../services/api.service';

const HISTORY_KEY = 'docugen_history';
const MAX_HISTORY_ITEMS = 5;

const useDocumentationGenerator = () => {
  const [status, setStatus] = useState<ProcessingStatus>('IDLE');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      setHistory([]);
    }
  }, []);

  const saveHistory = (newHistory: AnalysisHistoryItem[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  };

  const addToHistory = (item: Omit<AnalysisHistoryItem, 'id' | 'date'>) => {
    const newItem: AnalysisHistoryItem = {
      ...item,
      id: new Date().toISOString(),
      date: new Date().toLocaleString('en-US'),
    };
    const updatedHistory = [newItem, ...history]
      .filter((v, i, a) => a.findIndex(t => (t.url === v.url)) === i)
      .slice(0, MAX_HISTORY_ITEMS);
    saveHistory(updatedHistory);
  };

  const removeFromHistory = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    saveHistory(updatedHistory);
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  const reset = () => {
    setStatus('IDLE');
    setProgress(0);
    setCurrentStep('');
    setError(null);
  };

  const startGeneration = useCallback(async (generationUrl: string) => {
    if (!generationUrl || !/^(https?:\/\/)/.test(generationUrl)) {
      setError('Please enter a valid URL (e.g., https://example.com).');
      setStatus('ERROR');
      return;
    }
    
    reset();
    setUrl(generationUrl);

    try {
      // Step 1: Analyzing
      setStatus('ANALYZING');
      setCurrentStep('Fetching project files & identifying tech stack...');
      setProgress(10);
      const analysisResult = await apiService.analyzeUrl(generationUrl);
      setProgress(40);

      // Step 2: Generating Content
      setStatus('GENERATING');
      setCurrentStep('AI is analyzing code and generating content...');
      const docData = await apiService.generateDocContent(analysisResult.analysisId, generationUrl);
      setProgress(90);

      // Step 3: Finalizing
      setStatus('FINALIZING');
      setCurrentStep('Preparing document preview...');
      await new Promise(r => setTimeout(r, 1000)); // Simulate final prep time
      setProgress(100);

      addToHistory({ url: generationUrl, projectName: docData.projectName });
      
      // Navigate to preview page with data
      navigate('/preview', { state: { data: docData } });
      // Reset state for next generation
      setTimeout(reset, 500);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unknown error occurred during analysis.');
      setStatus('ERROR');
    }
  }, [history, navigate]);

  return { status, progress, currentStep, error, url, setUrl, history, startGeneration, reset, removeFromHistory, clearHistory };
};

export default useDocumentationGenerator;
