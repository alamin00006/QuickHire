import ctaDashboard from "@/assets/cta-dashboard.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

const CTASection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-2 bg-background">
      <div className="container mx-auto px-6">
        <div
          className="relative bg-primary overflow-visible min-h-[340px] flex items-center"
          style={{
            clipPath: isMobile
              ? "polygon(20% 0, 100% 0, 100% 70%, 65% 100%, 0 100%, 0 15%)"
              : "polygon(10% 0, 100% 0, 100% 85%, 90% 100%, 0 100%, 0 15%)",
          }}
        >
          {/* Left side - Text */}
          <div className="py-16 px-10 lg:px-16 lg:w-1/2">
            <h2 className="text-3xl md:text-[44px] font-serif text-primary-foreground leading-tight mb-4">
              Start posting <br /> jobs today
            </h2>

            <p className="text-primary-foreground/70 text-base mb-8">
              Start posting jobs for only $10.
            </p>

            <a
              href="#"
              className="inline-block bg-background text-foreground font-bold px-7 py-3.5 rounded-md hover:bg-background/90 transition-colors text-sm"
            >
              Sign Up For Free
            </a>
            <div className=" md:hidden sm:block mt-10 ">
              <img
                src={ctaDashboard}
                alt="QuickHire Dashboard Preview"
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          </div>

          {/* Right side - Dashboard image overlapping */}
          <div className="hidden lg:block absolute right-24 top-1/2 -translate-y-1/2 w-[50%] h-48">
            <img
              src={ctaDashboard}
              alt="QuickHire Dashboard Preview"
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
