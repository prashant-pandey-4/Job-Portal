import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';
import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className='flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full'>
                <div className="mb-8">
                    <h1 className='font-extrabold text-2xl text-gray-900'>
                        Search Results
                        {searchedQuery && <span className="text-purple-600 font-medium"> for "{searchedQuery}"</span>}
                    </h1>
                    <p className="text-gray-500 mt-1">Found {allJobs.length} matches</p>
                </div>

                {
                    allJobs.length <= 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 flex flex-col items-center justify-center text-center mt-10">
                            <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                                <SearchX className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
                            <p className="text-gray-500 max-w-sm">We couldn't find any jobs matching your search. Try using different keywords or check back later.</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {
                                allJobs.map((job) => {
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            key={job._id}>
                                            <Job job={job} />
                                        </motion.div>
                                    )
                                })
                            }
                        </div>
                    )
                }

            </div>
            <Footer />
        </div>
    )
}

export default Browse
