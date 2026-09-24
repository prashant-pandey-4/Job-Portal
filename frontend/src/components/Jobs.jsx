import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Frown, Search, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import Footer from "./shared/Footer";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [localQuery, setLocalQuery] = useState(searchedQuery || "");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchedQuery(localQuery));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="w-full flex items-center justify-between bg-white border-gray-200 py-3 rounded-xl shadow-xs"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-gray-800">
                  {showMobileFilter ? "Hide Filters" : "Filter Jobs"}
                </span>
                {searchedQuery && (
                  <span className="ml-1 px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full font-medium">
                    Active
                  </span>
                )}
              </div>
              {showMobileFilter ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </Button>

            {/* Mobile Filter Drawer / Collapsible */}
            <AnimatePresence>
              {showMobileFilter && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mt-3"
                >
                  <FilterCard />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Left Sidebar - Filters */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <FilterCard />
          </div>

          {/* Right Content - Jobs Feed */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Responsive Search Bar for Jobs */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center w-full bg-white rounded-2xl sm:rounded-full shadow-xs border border-gray-200 p-1.5 focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-transparent transition-all duration-300 gap-2 sm:gap-0"
            >
              <div className="flex items-center gap-2 pl-3 sm:pl-5 flex-1">
                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by role, skill, or location..."
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  className="outline-none border-none w-full py-2.5 sm:py-3 text-gray-700 placeholder-gray-400 bg-transparent text-sm sm:text-base"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-0 rounded-xl sm:rounded-full bg-gradient-to-r from-[#6A38C2] to-[#9333ea] hover:from-[#5b30a6] hover:to-[#7e22ce] text-white font-semibold transition-all duration-300 hover:shadow-purple-300 h-10 sm:h-11 text-sm sm:text-base shrink-0"
              >
                Search
              </button>
            </form>

            {filterJobs.length <= 0 ? (
              <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-8 sm:p-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Frown className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  No jobs found
                </h2>
                <p className="text-gray-500 text-sm sm:text-base max-w-sm">
                  We couldn't find any jobs matching your current filters. Try
                  adjusting your search criteria.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Showing {filterJobs.length} Job
                  {filterJobs.length > 1 ? "s" : ""}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {filterJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      key={job?._id}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;