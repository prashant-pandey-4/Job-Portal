import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { MapPin, Briefcase, IndianRupee, Users, Clock, CheckCircle2, Building2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [isApplying, setIsApplying] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        if (!user?.profile?.resume) {
            toast.error("Please upload a resume in your profile before applying.");
            navigate("/profile");
            return;
        }

        setIsApplying(true);
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply");
        } finally {
            setIsApplying(false);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob(); 
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
                {/* Header Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xs border border-gray-100 p-5 sm:p-8 mb-6 sm:mb-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border-2 border-gray-100 p-2 shadow-2xs bg-white shrink-0">
                                <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} className="object-contain" />
                                <AvatarFallback className="rounded-xl bg-purple-50 text-purple-600">
                                    <Building2 className="w-8 h-8"/>
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900 mb-1 sm:mb-2">
                                    {singleJob?.title}
                                </h1>
                                <p className="text-base sm:text-lg text-gray-600 font-medium mb-3 sm:mb-4">
                                    {singleJob?.company?.name}
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                    <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 font-medium border-0 text-xs sm:text-sm">
                                        <Briefcase className="w-3.5 h-3.5 mr-1.5" /> {singleJob?.position} Openings
                                    </Badge>
                                    <Badge className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 font-medium border-0 text-xs sm:text-sm">
                                        {singleJob?.jobType}
                                    </Badge>
                                    <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1 font-medium border-0 text-xs sm:text-sm">
                                        <IndianRupee className="w-3.5 h-3.5 mr-1" /> {singleJob?.salary} LPA
                                    </Badge>
                                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 font-medium border-0 text-xs sm:text-sm">
                                        <MapPin className="w-3.5 h-3.5 mr-1.5" /> {singleJob?.location}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="flex flex-col gap-2.5 w-full md:w-auto min-w-[200px] shrink-0 pt-2 sm:pt-0">
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied || isApplying || !user}
                                className={`w-full rounded-xl py-6 text-base sm:text-lg font-semibold shadow-xs transition-all duration-300 ${
                                    isApplied
                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-200 text-white'
                                }`}
                            >
                                {isApplying ? 'Submitting...' : isApplied ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-5 h-5"/> Applied Successfully
                                    </span>
                                ) : 'Apply Now'}
                            </Button>
                            {!user && (
                                <p className="text-xs text-center text-red-500 font-medium">
                                    You must be logged in to apply
                                </p>
                            )}
                            <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> Posted {singleJob?.createdAt?.split("T")[0]}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xs border border-gray-100 p-5 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4 sm:mb-6">
                                Job Description
                            </h2>
                            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                                {singleJob?.description || "No detailed description provided for this role."}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Overview */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xs border border-gray-100 p-5 sm:p-6">
                            <h3 className="font-bold text-gray-900 mb-4 sm:mb-6 text-base sm:text-lg">
                                Job Overview
                            </h3>
                            
                            <div className="space-y-4 sm:space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                                        <Briefcase className="w-5 h-5 text-purple-600"/>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">Experience</p>
                                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{singleJob?.experience} Years</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-blue-600"/>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">Applicants</p>
                                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{singleJob?.applications?.length || 0} Candidates</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                                        <IndianRupee className="w-5 h-5 text-green-600"/>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">Salary</p>
                                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{singleJob?.salary} LPA</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-orange-600"/>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">Location</p>
                                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{singleJob?.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default JobDescription;
