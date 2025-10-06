import { Link, NavLink } from 'react-router-dom';
import { FileCode2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-base-100/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <FileCode2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-base-content">DocuGen AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-base font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/generator" 
              className={({ isActive }) => 
                `text-base font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'}`
              }
            >
              Generator
            </NavLink>
            <Link to="/generator" className="hidden sm:inline-block bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
