import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, FileText, Zap, BarChart3, Code, Briefcase, CheckCircle } from 'lucide-react';

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="bg-base-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

const Step = ({ num, title, children }: { num: string, title: string, children: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-secondary text-white font-bold text-xl">
      {num}
    </div>
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 mt-1">{children}</p>
    </div>
  </div>
);

const HomePage = () => {
  const features = [
    { icon: <BrainCircuit />, title: "AI-Powered Analysis", description: "Intelligent code reading and interpretation for deep project insights." },
    { icon: <FileText />, title: "Academic-Standard Reports", description: "Professional documentation following industry and academic formats." },
    { icon: <Zap />, title: "Instant Generation", description: "Get comprehensive docs in under 2 minutes, saving you hours." },
    { icon: <BarChart3 />, title: "Structured Documentation", description: "Includes executive summary, methodology, and future scope." },
    { icon: <Code />, title: "Deep Code Analysis", description: "Frontend, backend, and architecture insights extracted automatically." },
    { icon: <Briefcase />, title: "Professional Export", description: "Download as a perfectly formatted Microsoft Word document." },
  ];

  const benefits = [
    "Save 10+ hours per project on documentation",
    "Academic and industry-standard formatting",
    "Perfect for portfolios, submissions, and client deliverables",
    "SMART goal-aligned documentation",
    "Comprehensive testing and results analysis",
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-base-content leading-tight"
          >
            Transform Your Web Projects into Professional Documentation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600"
          >
            Our AI-powered engine analyzes your live project URL and automatically generates a comprehensive, humanized report in seconds.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <Link to="/generator" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg">
              Generate Documentation <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose DocuGen AI?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Go from live project to submittable report effortlessly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(feature => (
              <FeatureCard key={feature.title} icon={feature.icon}>
                {feature.description}
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Get Your Report in 3 Simple Steps</h2>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-12">
            <Step num="1" title="Paste Your URL">
              Enter the publicly hosted URL of your web project. No code upload required.
            </Step>
            <Step num="2" title="AI Analysis">
              Our engine fetches, analyzes your project's code, structure, and functionality.
            </Step>
            <Step num="3" title="Download Document">
              Receive a professionally formatted, editable Word document in minutes.
            </Step>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Unlock Unmatched Efficiency</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Focus on building, not writing. We handle the documentation.
            </p>
          </div>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                <span className="text-lg text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
