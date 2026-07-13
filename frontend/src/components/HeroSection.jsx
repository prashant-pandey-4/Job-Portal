import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, Briefcase, Building2, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const stats = [
  { icon: Briefcase,  value: "10K+",  label: "Jobs Posted" },
  { icon: Building2,  value: "500+",  label: "Companies" },
  { icon: Users,      value: "1M+",   label: "Job Seekers" },
];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/jobs");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchJobHandler();
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 py-24 px-4">

      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
      <div className="absolute -top-16 -right-32 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <div className="relative max-w-4xl mx-auto text-center z-10">

        {/* Badge */}
        <div className="animate-fadeInUp inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md border border-purple-100 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#6A38C2] animate-pulse-dot" />
          <span className="text-sm font-semibold text-[#6A38C2] tracking-wide">
            #1 Job Hunt Platform in India
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fadeInUp-delay-1 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
          Find Your Perfect{" "}
          <span className="gradient-text">Dream Job</span>
          <br />
          <span className="text-4xl md:text-5xl font-bold text-gray-700">
            Start Your Journey Today
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fadeInUp-delay-2 text-lg md:text-xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
          Thousands of opportunities waiting for you. Connect with top companies,
          build your career, and take the next big step — all in one place.
        </p>

        {/* Search Bar */}
        <div className="animate-fadeInUp-delay-2 flex items-center w-full max-w-2xl mx-auto bg-white rounded-full shadow-xl border border-gray-200 overflow-hidden mb-12 focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-transparent transition-all duration-300">
          <div className="flex items-center gap-2 pl-5 flex-1">
            <Search className="h-5 w-5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title, keyword or company..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="outline-none border-none w-full py-4 text-gray-700 placeholder-gray-400 bg-transparent text-base"
            />
          </div>
          <Button
            onClick={searchJobHandler}
            className="m-1.5 px-8 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#9333ea] hover:from-[#5b30a6] hover:to-[#7e22ce] text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-purple-300 hover:scale-105 h-12"
          >
            Search Jobs
          </Button>
        </div>

        {/* Stats Row */}
        <div className="animate-fadeInUp-delay-3 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-[#6A38C2]" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

