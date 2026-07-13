import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Frown, Search } from 'lucide-react';
import Footer from './shared/Footer';
import { setSearchedQuery } from '@/redux/jobSlice';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [localQuery, setLocalQuery] = useState(searchedQuery || "");
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchedQuery(localQuery));
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className='flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full'>
                <div className='flex flex-col lg:flex-row gap-8'>
                    
                    {/* Left Sidebar - Filters */}
                    <div className='w-full lg:w-72 flex-shrink-0'>
                        <FilterCard />
                    </div>

                    {/* Right Content - Jobs Feed */}
                    <div className='flex-1 flex flex-col gap-6'>
                        
                        {/* Search Bar for Jobs */}
                        <form onSubmit={handleSearchSubmit} className="flex items-center w-full bg-white rounded-full shadow-sm border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-transparent transition-all duration-300">
                            <div className="flex items-center gap-2 pl-5 flex-1">
                                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search by role, skill, or location..."
                                    value={localQuery}
                                    onChange={(e) => setLocalQuery(e.target.value)}
                                    className="outline-none border-none w-full py-4 text-gray-700 placeholder-gray-400 bg-transparent text-base"
                                />
                            </div>
                            <button
                                type="submit"
                                className="m-1.5 px-8 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#9333ea] hover:from-[#5b30a6] hover:to-[#7e22ce] text-white font-semibold transition-all duration-300 hover:shadow-purple-300 h-11"
                            >
                                Search
                            </button>
                        </form>

                        {
                            filterJobs.length <= 0 ? (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
                                        <Frown className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h2>
                                    <p className="text-gray-500 max-w-sm">We couldn't find any jobs matching your current filters. Try adjusting your search criteria.</p>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Showing {filterJobs.length} Job{filterJobs.length > 1 ? 's' : ''}</h2>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        {
                                            filterJobs.map((job) => (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job?._id}>
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs