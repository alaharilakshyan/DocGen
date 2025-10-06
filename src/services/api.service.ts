import axios from 'axios';
import { DocumentationData } from '../types/documentation';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IS_MOCK_MODE = !API_URL || API_URL === 'YOUR_API_BASE_URL';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// --- MOCK DATA GENERATOR (Used when backend is not configured) ---

const createMockData = (url: string): DocumentationData => {
  const projectName = new URL(url).hostname.replace('www.', '').split('.')[0];
  return {
    projectName: projectName.charAt(0).toUpperCase() + projectName.slice(1),
    projectUrl: url,
    generationDate: new Date().toLocaleDateString('en-US'),
    executiveSummary: `This document provides a comprehensive overview of the ${projectName} project. The project successfully achieves its primary goal of creating a modern, responsive web application. Key successes include a robust component architecture and a highly intuitive user interface, overcoming challenges related to state management and asynchronous data fetching.`,
    projectIntroduction: {
      problemStatement: `The core problem addressed is the lack of a centralized platform for [specific domain problem]. Users currently rely on fragmented, inefficient solutions, leading to wasted time and potential errors.`,
      proposedSolution: `The ${projectName} application solves this by offering a unified, feature-rich web interface. It streamlines the user workflow through [key feature 1] and [key feature 2], providing a seamless and efficient experience.`,
      goalsAndObjectives: "Primary Goal: Develop a fully functional web application.\n- Specific: Build a React-based SPA with user authentication.\n- Measurable: Achieve <2s page load time.\n- Realistic: Achievable with the selected tech stack.\n- Time-Related: Completed within a 3-month development cycle.",
      scope: "In Scope: User registration, core feature implementation, responsive design.\nOut of Scope: Native mobile applications, advanced analytics dashboard.",
      targetAudience: "The primary target audience is tech-savvy professionals aged 25-45 who require an efficient tool for [task]. They are comfortable with modern web applications and expect a fast, intuitive user experience.",
    },
    projectMethodology: {
      developmentApproach: "The project adopted an Agile development methodology, specifically using a Scrum-like framework. This allowed for iterative development, flexibility in requirement changes, and continuous feedback cycles, which was ideal for this user-centric application.",
      toolsAndTechnologies: "Frontend: React, TypeScript, Tailwind CSS\nState Management: Redux Toolkit\nAPI Communication: Axios\nBuild Tool: Vite",
      requirementsAnalysis: "Functional: User authentication, CRUD operations, real-time updates.\nNon-Functional: High performance (Lighthouse score >90), WCAG 2.1 AA accessibility compliance, cross-browser compatibility.",
    },
    systemDesign: {
      systemArchitecture: "The application follows a client-server architecture. The frontend is a Single Page Application (SPA) built with React, which communicates with a backend REST API for data persistence and business logic.",
      moduleDescriptions: "Authentication Module: Handles user login, registration, and session management.\nDashboard Module: The main user interface for data visualization and interaction.\nAPI Integration Module: Manages all communication with external services.",
      databaseDesign: "The database uses a relational model with tables for Users, Projects, and Tasks. Foreign key constraints enforce data integrity between these entities.",
      interfaceDesign: "The UI/UX design focuses on minimalism and clarity. A consistent color scheme and typographic hierarchy are used throughout the application to ensure a predictable and user-friendly experience.",
      codeSamples: "// Code Sample: Fetching user data\nasync function fetchUserData(userId) {\n  try {\n    const response = await api.get(`/users/${userId}`);\n    return response.data;\n  } catch (error) {\n    console.error('Failed to fetch user', error);\n  }\n}",
    },
    testingAndResults: {
      testingStrategy: "A comprehensive testing strategy was employed, including unit tests for individual components (Jest & React Testing Library), integration tests for user flows, and end-to-end tests (Cypress) to validate the full application.",
      testResults: "Unit test coverage exceeded 90%. All critical user flows passed integration and E2E testing. Performance benchmarks met the sub-2-second page load target.",
      projectAccomplishments: "Successfully launched a production-ready application that meets all primary functional requirements. Achieved a 98% user satisfaction rate in initial UAT.",
    },
    conclusion: {
      summaryOfAchievements: "The project was a resounding success, delivering a high-quality, performant, and user-friendly application on schedule. The technical architecture proved to be scalable and maintainable.",
      challengesAndLimitations: "A key challenge was optimizing the real-time data synchronization, which was solved by implementing WebSockets. A current limitation is the lack of offline support.",
      futureEnhancements: "Short-term: Implement offline caching.\nMedium-term: Develop a native mobile companion app.\nLong-term: Integrate machine learning for personalized recommendations.",
    },
    appendix: {
      codeRepository: "The full source code is available at: https://github.com/example/project-repo",
      references: "React Documentation, MDN Web Docs, Tailwind CSS Docs.",
      glossary: "SPA: Single Page Application - A web application that loads a single HTML page and dynamically updates content.",
    },
  };
};


// --- API SERVICE FUNCTIONS ---

export const analyzeUrl = async (url: string): Promise<{ analysisId: string; projectName: string }> => {
  if (IS_MOCK_MODE) {
    console.warn('[MOCK MODE] Simulating API analysis. To connect to a real backend, set VITE_API_BASE_URL in your .env file.');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    const projectName = new URL(url).hostname.replace('www.', '').split('.')[0] || 'mock-project';
    return { analysisId: `mock-${Date.now()}`, projectName };
  }

  console.log(`[API] Sending analysis request for: ${url}`);
  try {
    const response = await apiClient.post('/analyze', { url });
    return response.data;
  } catch (error) {
    console.error("[API] Analysis request failed:", error);
    throw new Error('Could not connect to the backend to start analysis. Please ensure it is running and the API URL is correct.');
  }
};

export const generateDocContent = async (analysisId: string, url: string): Promise<DocumentationData> => {
  if (IS_MOCK_MODE) {
    console.warn('[MOCK MODE] Simulating document generation.');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate generation time
    return createMockData(url);
  }

  console.log(`[API] Fetching document content for analysis ID: ${analysisId}`);
  try {
    const response = await apiClient.get(`/result/${analysisId}`);
    return response.data;
  } catch (error) {
    console.error("[API] Content generation request failed:", error);
    throw new Error('Could not retrieve the generated document from the backend. Please check the server status.');
  }
};
