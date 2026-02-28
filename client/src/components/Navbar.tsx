import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-[72px]">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-success flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-success-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              QuickHire
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/jobs"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              to="/jobs"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Browse Companies
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm font-bold bg-primary text-primary-foreground px-6 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
