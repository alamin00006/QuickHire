import { Briefcase, Globe } from "lucide-react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-success-foreground" />
              </div>
              <span className="text-xl font-bold text-background">
                QuickHire
              </span>
            </div>
            <p className="text-sm text-footer-foreground/60 leading-relaxed">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-background mb-5 text-base">About</h4>
            <ul className="space-y-3 text-sm text-footer-foreground/60">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Companies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Advice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-background mb-5 text-base">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-footer-foreground/60">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Help Docs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Updates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-background mb-5 text-base">
              Get job notifications
            </h4>
            <p className="text-sm text-footer-foreground/60 mb-4 leading-relaxed">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-footer-foreground/10 border border-footer-foreground/20 rounded-md px-4 py-2.5 text-sm text-background placeholder:text-footer-foreground/40 outline-none flex-1"
              />
              <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-footer-foreground/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-footer-foreground/40">
            2021 @ QuickHire. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            {[Facebook, Instagram, Globe, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-footer-foreground/10 flex items-center justify-center hover:bg-footer-foreground/20 transition-colors"
              >
                <Icon className="w-4 h-4 text-footer-foreground/60" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
