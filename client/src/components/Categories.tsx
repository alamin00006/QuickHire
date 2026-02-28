import {
  Scissors,
  BarChart3,
  Megaphone,
  Camera,
  Monitor,
  Code,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { icon: Scissors, name: "Design", count: 235 },
  { icon: BarChart3, name: "Sales", count: 756 },
  { icon: Megaphone, name: "Marketing", count: 140, highlighted: true },
  { icon: Camera, name: "Finance", count: 325 },
  { icon: Monitor, name: "Technology", count: 436 },
  { icon: Code, name: "Engineering", count: 542 },
  { icon: Briefcase, name: "Business", count: 211 },
  { icon: Users, name: "Human Resource", count: 346 },
];

const Categories = () => {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-[42px] font-serif text-foreground font-bold">
            Explore by <span className="text-[#26A4FF]  ">category</span>
          </h2>
          <Link
            to="/jobs"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Show all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.highlighted;
            return (
              <div
                key={cat.name}
                className={`group p-8 h-[84px] md:h-[214px] flex md:flex-col sm:flex-row gap-5 md:items-start sm:items-center  rounded-xl border cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-primary border-primary shadow-lg"
                    : "bg-background border-border hover:border-primary/30 hover:shadow-md"
                }`}
              >
                <Icon
                  className={`w-10 h-10 mb-6 ${isActive ? "text-primary-foreground" : "text-primary"}`}
                  strokeWidth={1.5}
                />
                <h3
                  className={`text-lg font-sans font-bold mb-2 ${
                    isActive ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {cat.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm ${
                      isActive
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {cat.count} jobs available
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ${
                      isActive
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
