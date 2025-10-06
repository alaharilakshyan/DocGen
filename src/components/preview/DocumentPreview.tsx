import { DocumentationData } from '../../types/documentation';
import Section from './Section';

interface DocumentPreviewProps {
  data: DocumentationData;
}

const CodeBlock = ({ code }: { code: string }) => (
  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
    <code>{code}</code>
  </pre>
);

const DocumentPreview = ({ data }: DocumentPreviewProps) => {
  const renderContent = (content: string) => {
    const parts = content.split(/(?=\/\/\s*Code\s*Sample)/g);
    return parts.map((part, index) => {
      if (part.startsWith('//')) {
        return <CodeBlock key={index} code={part} />;
      }
      return (
        <p key={index} className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {part}
        </p>
      );
    });
  };
  
  return (
    <div className="bg-base-100 p-8 md:p-12 rounded-lg shadow-xl max-w-5xl mx-auto">
      <div className="text-center border-b pb-8 mb-8">
        <h1 className="text-4xl font-bold text-primary">{data.projectName}</h1>
        <p className="text-lg text-gray-500 mt-2">Comprehensive Project Documentation</p>
        <div className="text-sm text-gray-400 mt-4 flex justify-center gap-6">
          <span>Date: {data.generationDate}</span>
          <span>URL: {data.projectUrl}</span>
        </div>
      </div>

      <Section title="1. Executive Summary">
        {renderContent(data.executiveSummary)}
      </Section>

      <Section title="2. Project Introduction">
        <Section title="2.1 Problem Statement" level={2}>
          {renderContent(data.projectIntroduction.problemStatement)}
        </Section>
        <Section title="2.2 Proposed Solution" level={2}>
          {renderContent(data.projectIntroduction.proposedSolution)}
        </Section>
        <Section title="2.3 Goals and Objectives" level={2}>
          {renderContent(data.projectIntroduction.goalsAndObjectives)}
        </Section>
        <Section title="2.4 Scope" level={2}>
          {renderContent(data.projectIntroduction.scope)}
        </Section>
        <Section title="2.5 Target Audience" level={2}>
          {renderContent(data.projectIntroduction.targetAudience)}
        </Section>
      </Section>

      <Section title="3. Project Methodology">
        <Section title="3.1 Development Approach" level={2}>
          {renderContent(data.projectMethodology.developmentApproach)}
        </Section>
        <Section title="3.2 Tools and Technologies" level={2}>
          {renderContent(data.projectMethodology.toolsAndTechnologies)}
        </Section>
        <Section title="3.3 Requirements Analysis" level={2}>
          {renderContent(data.projectMethodology.requirementsAnalysis)}
        </Section>
      </Section>

      <Section title="4. System Design and Implementation">
        <Section title="4.1 System Architecture" level={2}>
          {renderContent(data.systemDesign.systemArchitecture)}
        </Section>
        <Section title="4.2 Module Descriptions" level={2}>
          {renderContent(data.systemDesign.moduleDescriptions)}
        </Section>
        <Section title="4.3 Database Design" level={2}>
          {renderContent(data.systemDesign.databaseDesign)}
        </Section>
        <Section title="4.4 Interface Design" level={2}>
          {renderContent(data.systemDesign.interfaceDesign)}
        </Section>
        <Section title="4.5 Code Samples" level={2}>
          {renderContent(data.systemDesign.codeSamples)}
        </Section>
      </Section>

      <Section title="5. Testing and Results">
        <Section title="5.1 Testing Strategy" level={2}>
          {renderContent(data.testingAndResults.testingStrategy)}
        </Section>
        <Section title="5.2 Test Results" level={2}>
          {renderContent(data.testingAndResults.testResults)}
        </Section>
        <Section title="5.3 Project Accomplishments" level={2}>
          {renderContent(data.testingAndResults.projectAccomplishments)}
        </Section>
      </Section>

      <Section title="6. Conclusion and Future Scope">
        <Section title="6.1 Summary of Achievements" level={2}>
          {renderContent(data.conclusion.summaryOfAchievements)}
        </Section>
        <Section title="6.2 Challenges and Limitations" level={2}>
          {renderContent(data.conclusion.challengesAndLimitations)}
        </Section>
        <Section title="6.3 Future Enhancements" level={2}>
          {renderContent(data.conclusion.futureEnhancements)}
        </Section>
      </Section>

      <Section title="7. Appendix">
        <Section title="7.1 Code Repository" level={2}>
          {renderContent(data.appendix.codeRepository)}
        </Section>
        <Section title="7.2 References" level={2}>
          {renderContent(data.appendix.references)}
        </Section>
        <Section title="7.3 Glossary" level={2}>
          {renderContent(data.appendix.glossary)}
        </Section>
      </Section>
    </div>
  );
};

export default DocumentPreview;
