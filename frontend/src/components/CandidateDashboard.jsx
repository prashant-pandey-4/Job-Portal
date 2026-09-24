import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Briefcase, BookmarkIcon, Clock, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import Footer from './shared/Footer';

const CandidateDashboard = () => {
    const { user } = useSelector(store => store.auth);
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/jobs");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") searchJobHandler();
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <div className="flex-grow max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
                
                {/* Responsive Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-3xl mx-auto bg-white rounded-2xl sm:rounded-full shadow-xs border border-gray-200 p-1.5 mb-8 sm:mb-12 focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-transparent transition-all duration-300 gap-2 sm:gap-0">
                    <div className="flex items-center gap-2 pl-3 sm:pl-5 flex-1">
                        <Search className="h-5 w-5 text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Job title, keyword or company..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="outline-none border-none w-full py-2.5 sm:py-3.5 text-gray-700 placeholder-gray-400 bg-transparent text-sm sm:text-base"
                        />
                    </div>
                    <Button
                        onClick={searchJobHandler}
                        className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-0 rounded-xl sm:rounded-full bg-gradient-to-r from-[#6A38C2] to-[#9333ea] hover:from-[#5b30a6] hover:to-[#7e22ce] text-white font-semibold transition-all duration-300 hover:shadow-purple-200 h-10 sm:h-11 shrink-0 text-sm sm:text-base"
                    >
                        Search
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                    
                    {/* Left Sidebar - Profile Widget */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mb-4 border-4 border-purple-50">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{user?.fullname}</h2>
                            <p className="text-xs sm:text-sm text-gray-500 mb-4">{user?.profile?.bio || "Student / Job Seeker"}</p>
                            
                            <div className="w-full pt-4 border-t border-gray-100 flex flex-col gap-3">
                                <Button variant="outline" className="w-full justify-between group hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 text-sm" onClick={() => navigate('/profile')}>
                                    <span>View Profile</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Feed - Recommended Jobs */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-5 sm:p-6">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recommended for you</h2>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Based on your skills and preferences</p>
                                </div>
                                <Button variant="link" className="text-purple-600 px-0 text-sm font-semibold" onClick={() => navigate('/jobs')}>
                                    View all
                                </Button>
                            </div>
                            
                            <div className="space-y-4">
                                {allJobs.length > 0 ? (
                                    allJobs.slice(0, 5).map(job => (
                                        <div key={job._id} className="border border-gray-100 rounded-xl hover:border-purple-300 hover:shadow-md transition-all p-4 sm:p-5 bg-white group cursor-pointer" onClick={() => navigate(`/description/${job._id}`)}>
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex gap-3 sm:gap-4">
                                                    <Avatar className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl border border-gray-100 bg-white shadow-2xs p-1 shrink-0">
                                                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className="object-contain" />
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">{job?.title}</h3>
                                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">{job?.company?.name}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full shrink-0" onClick={(e) => { e.stopPropagation(); }}>
                                                    <BookmarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </Button>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <Badge variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-gray-100 font-normal text-xs">
                                                    <MapPin className="w-3 h-3 mr-1" /> {job?.location}
                                                </Badge>
                                                <Badge variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-gray-100 font-normal text-xs">
                                                    <Briefcase className="w-3 h-3 mr-1" /> {job?.jobType}
                                                </Badge>
                                                <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium text-xs">
                                                    {job?.salary} LPA
                                                </Badge>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                                                <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                                                    <Clock className="w-3 h-3" /> Just posted
                                                </span>
                                                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5 h-8 sm:h-9 text-xs sm:text-sm shadow-xs">
                                                    Apply Now
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        <p className="text-gray-500 text-sm">No recommended jobs found at the moment.</p>
                                        <Button variant="outline" className="mt-4 text-purple-600 border-purple-200" onClick={() => navigate('/jobs')}>Browse All Jobs</Button>
                                    </div>
                                )}
                            </div>
                            
                            {allJobs.length > 0 && (
                                <Button variant="outline" className="w-full mt-6 text-purple-700 border-purple-200 hover:bg-purple-50 font-semibold text-sm" onClick={() => navigate('/jobs')}>
                                    Explore all job openings
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar - Activity / Recent */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-5 sm:p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 text-base">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="text-sm bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-center">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <p className="text-gray-700 font-medium mb-1">Track your applications</p>
                                    <p className="text-gray-500 text-xs mb-3">You haven't applied to any jobs recently.</p>
                                    <Button variant="default" size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-xs" onClick={() => navigate('/jobs')}>
                                        Find Jobs
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Premium Jobs Card */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-xs p-5 sm:p-6 text-white text-center">
                            <h3 className="font-bold mb-1 text-base sm:text-lg">Premium Jobs</h3>
                            <p className="text-purple-100 text-xs sm:text-sm mb-4">Stand out to recruiters and get hired faster.</p>
                            <Button className="w-full bg-white text-purple-700 hover:bg-gray-50 font-bold shadow-xs text-sm">
                                Upgrade Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CandidateDashboard;
