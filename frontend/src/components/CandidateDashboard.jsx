import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { MapPin, Briefcase, BookmarkIcon, Clock, ChevronRight, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useState } from 'react'
import Footer from './shared/Footer'

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
            <div className="flex-grow max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 py-10 w-full">
                
                {/* Search Bar */}
                <div className="flex items-center w-full max-w-4xl mx-auto bg-white rounded-full shadow-sm border border-gray-200 overflow-hidden mb-12 focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-transparent transition-all duration-300">
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
                        className="m-1.5 px-8 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#9333ea] hover:from-[#5b30a6] hover:to-[#7e22ce] text-white font-semibold transition-all duration-300 hover:shadow-purple-300 h-11"
                    >
                        Search
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
                    
                    {/* Left Sidebar - Profile Widget */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <Avatar className="h-24 w-24 mb-4 border-4 border-purple-50">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                            <h2 className="text-xl font-bold text-gray-900">{user?.fullname}</h2>
                            <p className="text-sm text-gray-500 mb-4">{user?.profile?.bio || "Student / Job Seeker"}</p>
                            
                            <div className="w-full pt-4 border-t border-gray-100 flex flex-col gap-3">
                                <Button variant="outline" className="w-full justify-between group hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200" onClick={() => navigate('/profile')}>
                                    <span>View Profile</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Feed - Recommended Jobs */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Recommended for you</h2>
                                    <p className="text-sm text-gray-500 mt-1">Based on your skills and preferences</p>
                                </div>
                                <Button variant="link" className="text-purple-600 px-0 hidden sm:block" onClick={() => navigate('/jobs')}>
                                    View all
                                </Button>
                            </div>
                            
                            <div className="space-y-4">
                                {allJobs.length > 0 ? (
                                    allJobs.slice(0, 5).map(job => (
                                        <div key={job._id} className="border border-gray-100 rounded-xl hover:border-purple-300 hover:shadow-md transition-all p-5 bg-white group cursor-pointer" onClick={() => navigate(`/description/${job._id}`)}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex gap-4">
                                                    <Avatar className="h-14 w-14 rounded-xl border border-gray-100 bg-white shadow-sm p-1">
                                                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className="object-contain" />
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">{job?.title}</h3>
                                                        <p className="text-sm text-gray-500 font-medium">{job?.company?.name}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full" onClick={(e) => { e.stopPropagation(); }}>
                                                    <BookmarkIcon className="w-5 h-5" />
                                                </Button>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <Badge variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-gray-100 font-normal">
                                                    <MapPin className="w-3 h-3 mr-1" /> {job?.location}
                                                </Badge>
                                                <Badge variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-gray-100 font-normal">
                                                    <Briefcase className="w-3 h-3 mr-1" /> {job?.jobType}
                                                </Badge>
                                                <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium">
                                                    {job?.salary} LPA
                                                </Badge>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                                <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                                                    <Clock className="w-3 h-3" /> Just posted
                                                </span>
                                                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 h-9 shadow-sm shadow-purple-200">
                                                    Apply Now
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        <p className="text-gray-500">No recommended jobs found at the moment.</p>
                                        <Button variant="outline" className="mt-4 text-purple-600 border-purple-200" onClick={() => navigate('/jobs')}>Browse All Jobs</Button>
                                    </div>
                                )}
                            </div>
                            
                            {allJobs.length > 0 && (
                                <Button variant="outline" className="w-full mt-6 text-purple-700 border-purple-200 hover:bg-purple-50 font-semibold" onClick={() => navigate('/jobs')}>
                                    Explore all job openings
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar - Activity / Recent */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="text-sm bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-center">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <p className="text-gray-700 font-medium mb-1">Track your applications</p>
                                    <p className="text-gray-500 text-xs mb-3">You haven't applied to any jobs recently.</p>
                                    <Button variant="default" size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm" onClick={() => navigate('/jobs')}>
                                        Find Jobs
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Top Companies snippet */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-sm p-6 text-white text-center">
                            <h3 className="font-bold mb-2">Premium Jobs</h3>
                            <p className="text-purple-100 text-sm mb-4">Stand out to recruiters and get hired faster.</p>
                            <Button className="w-full bg-white text-purple-700 hover:bg-gray-50 font-bold shadow-md">
                                Upgrade Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CandidateDashboard
