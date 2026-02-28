import { useGetJobsQuery } from "@/redux/api/jobApi";
import { ArrowRight } from "lucide-react";
import { JobCardSkeleton } from "./JobCardSkeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import pattern from "@/assets/Pattern.png";
import { Link } from "react-router-dom";

const tagStyles: Record<string, string> = {
  "Full-Time": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Full Time": "bg-emerald-50 text-emerald-600 border-emerald-200",
  Design: "bg-indigo-50 text-indigo-600 border-indigo-200",
  Marketing: "bg-amber-50 text-amber-600 border-amber-200",
};

// Simple company logo colors
const logoColors = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-indigo-600",
  "bg-cyan-600",
  "bg-orange-600",
];

// Mock data matching your image exactly
const mockJobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    tags: ["Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    type: "Full-Time",
    tags: ["Design"],
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    type: "Full-Time",
    tags: ["Design"],
  },
  {
    id: 4,
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    type: "Full-Time",
    tags: ["Design"],
  },
  {
    id: 5,
    title: "Social Media Assistant",
    company: "Netflix",
    location: "Paris, France",
    type: "Full-Time",
    tags: ["Design"],
  },
  {
    id: 6,
    title: "Brand Designer",
    company: "Maze",
    location: "San Fransisco, USA",
    type: "Full-Time",
    tags: ["Design"],
  },
  {
    id: 7,
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    type: "Full-Time",
    tags: ["Design"],
  },
  {
    id: 8,
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    type: "Full-Time",
    tags: ["Design"],
  },
];

const LatestJobs = () => {
  const isMobile = useIsMobile();

  const { data: latestJobs, isLoading } = useGetJobsQuery({}) as any;

  // Use API data if available, otherwise use mock data
  const jobs = latestJobs?.data || latestJobs?.jobs || mockJobs;

  {
    isLoading && (
      <div className="grid md:grid-cols-2 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <section
      className="relative py-16 bg-[#f8fafc] overflow-hidden"
      style={{
        clipPath: isMobile
          ? "polygon(10% 0, 100% 0, 100% 85%, 100% 100%, 10% 100%, 0 5%)"
          : "polygon(10% 0, 100% 0, 100% 85%, 100% 100%, 0 100%, 0 15%)",
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Header - exactly like the image */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl text-slate-800  font-bold">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>

          <Link
            to="/jobs"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Show all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Job Cards Grid - exactly matching the image layout */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {jobs.slice(0, 8).map((job, index) => (
            <div
              key={job.id || job._id || index}
              className="bg-white rounded-xl px-6 py-5 border border-slate-200 hover:border-blue-200 transition-all duration-300 flex items-start gap-4"
            >
              {/* Company Initial Circle */}
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold text-lg shrink-0 ${
                  logoColors[index % logoColors.length]
                }`}
              >
                {job.company[0]}
              </div>

              {/* Job Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 text-base">
                  {job.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1 mb-3">
                  {job.company} · {job.location.city}, {job.location.country}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Job Type Badge */}
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full border ${
                      tagStyles[job.type] ||
                      "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {job.type}
                  </span>

                  {/* Design Tag */}
                  {job.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-3 py-1 rounded-full border ${
                        tagStyles[tag] ||
                        "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Link */}
        {/* <div className="sm:hidden flex justify-center mt-8">
          <Link
            to="/jobs"
            className="flex items-center gap-2 text-sm font-medium text-blue-600"
          >
            Show all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default LatestJobs;
