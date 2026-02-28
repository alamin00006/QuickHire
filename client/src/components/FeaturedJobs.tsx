import { useGetJobsQuery } from "@/redux/api/jobApi";
import { ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";

const FeaturedJobs = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetJobsQuery({ isFeatured: true }) as any;
  const handleNavigateDetails = (id: string) => {
    navigate(`/jobs/${id}`);
  };
  if (isLoading) return <p>Loading featured jobs...</p>;

  const JobCard = (job: any) => (
    <div
      onClick={() => {
        handleNavigateDetails(job._id);
      }}
      className="bg-card border border-border rounded-lg p-5 hover:shadow-lg transition-shadow cursor-pointer group h-full"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="w-11 h-11 rounded-full bg-primary text-background flex items-center justify-center text-sm font-bold">
          {job.company[0]}
        </div>

        <span className="text-xs font-semibold border border-primary text-primary px-3 py-1 rounded">
          {job.type}
        </span>
      </div>

      <h3 className="font-sans font-bold text-foreground text-[15px] mb-0.5">
        {job.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-3">
        {job.company} · {job.location?.city}, {job.location?.country}
      </p>

      <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      <div className="flex gap-2 flex-wrap">
        {job.tags?.map((tag: string) => (
          <span
            key={tag}
            className="text-xs font-semibold px-3 py-1 rounded-full border bg-primary/5 text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-5 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-[42px] font-serif text-foreground font-bold">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>

          <Link
            to="/jobs"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Show all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/*  Mobile Slider */}
        <div className="block lg:hidden">
          <Swiper spaceBetween={16} slidesPerView={1.2}>
            {data?.data?.map((job: any) => (
              <SwiperSlide key={job.id}>{JobCard(job)}</SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/*  Desktop Grid */}
        <div className="hidden lg:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data?.data?.map((job: any) => (
            <div key={job.id}>{JobCard(job)}</div>
          ))}
        </div>
      </div>
      {/* Mobile View All Link */}
      <div className="sm:hidden flex ms-5 mt-5 mb-5">
        <Link
          to="/jobs"
          className="flex items-center gap-2 text-sm font-medium text-blue-600"
        >
          Show all jobs <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedJobs;
