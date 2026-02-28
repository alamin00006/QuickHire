import { Search, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroPerson from "@/assets/hero-person.png";
import pattern from "@/assets/Pattern.png";
import { useGetLocationsQuery } from "@/redux/api/locationApi";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");

  const { data, isLoading } = useGetLocationsQuery({});
  const locations = data?.data || [];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.append("search", search.trim());
    if (selectedLocationId) params.append("location", selectedLocationId);
    const queryString = params.toString();
    navigate(queryString ? `/jobs?${queryString}` : "/jobs");
  };

  return (
    <section
      className="pt-[72px] bg-[#F8F8FD] relative overflow-hidden border border-transparent"
      style={{
        clipPath: isMobile
          ? ""
          : "polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 pb-5 md:pb-0 lg:pt-5">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT COLUMN */}
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
              Discover
              <br />
              more than
              <br />
              <span className="text-[#26A4FF] relative inline-block">
                5000+ Jobs
                {/* Responsive underline */}
                <svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-4 sm:h-5"
                  viewBox="0 0 400 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 10 Q100 0 200 10 T400 10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-10 max-w-2xl">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* SEARCH BAR – fully responsive */}
            <div className="flex flex-col sm:flex-row bg-white border border-gray-300 rounded-lg shadow-lg max-w-3xl w-full">
              {/* Job input */}
              <div className="flex items-center gap-4 px-5 py-4 flex-1 border-b sm:border-b-0 sm:border-r border-gray-300">
                <Search className="w-5 h-5 text-gray-500 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Job title or keyword"
                  className="bg-transparent outline-none text-base w-full text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Location select */}
              <div className="flex items-center gap-4 px-5 py-4 flex-1 border-b sm:border-b-0 sm:border-r border-gray-300">
                <MapPin className="w-5 h-5 text-gray-500 shrink-0" />
                {isLoading ? (
                  <span className="text-gray-500 text-base">Loading...</span>
                ) : (
                  <div className="relative w-full">
                    <select
                      value={selectedLocationId}
                      onChange={(e) => setSelectedLocationId(e.target.value)}
                      className="bg-transparent outline-none text-base w-full text-gray-900 cursor-pointer appearance-none pr-10"
                    >
                      <option value="">Dhaka, Bangladesh</option>
                      {locations.map((loc: any) => (
                        <option key={loc._id} value={loc._id}>
                          {loc.city}, {loc.country}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                )}
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-4 text-base font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto"
              >
                Search my job
              </button>
            </div>

            <p className="mt-4 sm:mt-6 text-sm text-gray-600">
              Popular :{" "}
              <span className="text-gray-900 font-medium">
                UI Designer, UX Researcher, Android, Admin
              </span>
            </p>
          </div>

          {/* RIGHT COLUMN – angled bottom-right corner */}
          <div className="hidden lg:flex justify-end min-h-[580px] items-end relative">
            {/* Pattern background */}
            <div className="absolute right-20 -top-10 bg-cover bg-center">
              <img
                src={pattern}
                alt="Pattern background"
                className="max-h-[840px] object-contain relative z-20 drop-shadow-2xl"
              />
            </div>

            {/* Person image */}
            <img
              src={heroPerson}
              alt="Excited job seeker"
              className="max-h-[640px] object-contain relative z-20 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
