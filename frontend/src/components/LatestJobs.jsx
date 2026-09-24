import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Briefcase } from 'lucide-react';

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
        <div className="max-w-7xl mx-auto my-12 sm:my-20 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#6A38C2] uppercase">
                    Opportunities
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-1">
                    <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mt-2">
                    Explore top opportunities from growing startups and established enterprises.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allJobs.length <= 0 ? (
                    <div className="col-span-full py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium">No job openings available right now.</p>
                        <p className="text-gray-400 text-sm mt-1">Check back later or explore all open categories.</p>
                    </div>
                ) : (
                    allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                )}
            </div>
        </div>
    );
};

export default LatestJobs;