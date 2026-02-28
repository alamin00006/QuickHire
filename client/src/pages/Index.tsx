import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CompanyLogos from "@/components/CompanyLogos";
import Categories from "@/components/Categories";
import CTASection from "@/components/CTASection";
import FeaturedJobs from "@/components/FeaturedJobs";
import LatestJobs from "@/components/LatestJobs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CompanyLogos />
      <Categories />
      <CTASection />
      <FeaturedJobs />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Index;
