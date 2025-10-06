import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  level?: 1 | 2;
  children: ReactNode;
}

const Section = ({ title, level = 1, children }: SectionProps) => {
  const HeadingTag = level === 1 ? 'h2' : 'h3';
  const headingClasses = level === 1 
    ? 'text-2xl font-bold text-primary border-b-2 border-primary/20 pb-2 mb-4' 
    : 'text-xl font-semibold text-base-content mb-3';

  return (
    <section className="mb-8">
      <HeadingTag className={headingClasses}>{title}</HeadingTag>
      <div className={level === 2 ? 'pl-4 border-l-2 border-gray-200' : ''}>
        {children}
      </div>
    </section>
  );
};

export default Section;
