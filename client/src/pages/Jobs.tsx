import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/lib/mockData";
import { useGetJobsQuery } from "@/redux/api/jobApi";
import { useGetLocationsQuery } from "@/redux/api/locationApi";

const tagColors: Record<string, string> = {
  Marketing: "text-tag-orange border-tag-orange bg-tag-orange/5",
  Design: "text-primary border-primary bg-primary/5",
  Business: "text-foreground border-foreground/30 bg-foreground/5",
  Technology: "text-success border-success bg-success/5",
  Engineering: "text-tag-blue border-tag-blue bg-tag-blue/5",
  "Human Resource": "text-accent-foreground border-accent bg-accent/10",
  Sales: "text-tag-orange border-tag-orange bg-tag-orange/5",
  Finance: "text-primary border-primary bg-primary/5",
};

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  //  URL params
  const urlSearch = searchParams.get("search") || "";
  const urlLocation = searchParams.get("location") || "";
  const urlCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedLocation, setSelectedLocation] = useState(urlLocation);

  //  Fetch Locations
  const { data: locationData } = useGetLocationsQuery({});
  const locations = locationData?.data || [];

  //  Sync state when URL changes
  useEffect(() => {
    setSearchQuery(urlSearch);
    setSelectedLocation(urlLocation);
    setSelectedCategory(urlCategory);
  }, [urlSearch, urlLocation, urlCategory]);

  //  Fetch Jobs
  const { data, isLoading, isError } = useGetJobsQuery({
    search: searchQuery || undefined,
    category: selectedCategory || undefined,
    location: selectedLocation || undefined, // sending locationId
  }) as any;

  const jobs = data?.data || [];

  //  Update URL when filters change
  useEffect(() => {
    const params: any = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedLocation) params.location = selectedLocation;

    setSearchParams(params);
  }, [searchQuery, selectedCategory, selectedLocation, setSearchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[72px]">
        {/* Search Header */}
        <div className="bg-secondary/50 border-b border-border py-10">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-serif font=bold text-foreground mb-6">
              Find your <span className="text-[#26A4FF] ">dream job</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-lg flex-1">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground outline-none"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {/* Location */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground outline-none"
              >
                <option value="">All Locations</option>
                {locations.map((loc: any) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.city}, {loc.country}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-sm text-muted-foreground mt-3">
              Showing {jobs.length} jobs
            </p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="container mx-auto px-6 py-10">
          {isLoading && (
            <p className="text-center py-20 text-muted-foreground">
              Loading jobs...
            </p>
          )}

          {isError && (
            <p className="text-center py-20 text-red-500">
              Failed to load jobs.
            </p>
          )}

          {!isLoading && !isError && (
            <div className="grid md:grid-cols-2 gap-5">
              {jobs.map((job: any) => (
                <Link
                  to={`/jobs/${job._id}`}
                  key={job._id}
                  className="flex items-start gap-5 p-6 border border-border rounded-xl hover:shadow-md transition-shadow bg-card group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center text-lg font-bold shrink-0">
                    {job.company?.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-foreground text-[15px] group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>

                      <span className="text-xs font-semibold border border-primary text-primary px-2.5 py-0.5 rounded shrink-0">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {job.company} · {job.location?.city},{" "}
                      {job.location?.country}
                    </p>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                      {job.description}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      {job.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                            tagColors[tag] ||
                            "text-muted-foreground border-border"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && jobs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No jobs found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
