import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
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
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
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
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply");
        } finally {
            setIsApplying(false);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className='flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full'>
                
                {/* Header Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex gap-6">
                            <Avatar className="h-24 w-24 rounded-2xl border-2 border-gray-100 p-2 shadow-sm bg-white shrink-0">
                                <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} className="object-contain" />
                                <AvatarFallback className="rounded-xl bg-purple-50 text-purple-600"><Building2 className="w-8 h-8"/></AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className='font-extrabold text-3xl text-gray-900 mb-2'>{singleJob?.title}</h1>
                                <p className="text-lg text-gray-600 font-medium mb-4">{singleJob?.company?.name}</p>
                                
                                <div className='flex flex-wrap items-center gap-3 mt-2'>
                                    <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 font-medium border-0'>
                                        <Briefcase className="w-3.5 h-3.5 mr-1.5" /> {singleJob?.position} Openings
                                    </Badge>
                                    <Badge className='bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 font-medium border-0'>
                                        {singleJob?.jobType}
                                    </Badge>
                                    <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1 font-medium border-0'>
                                        <IndianRupee className="w-3.5 h-3.5 mr-1" /> {singleJob?.salary} LPA
                                    </Badge>
                                    <Badge className='bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 font-medium border-0'>
                                        <MapPin className="w-3.5 h-3.5 mr-1.5" /> {singleJob?.location}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] shrink-0 mt-4 md:mt-0">
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied || isApplying || !user}
                                className={`w-full rounded-xl py-6 text-lg shadow-sm transition-all duration-300 ${isApplied ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-300'}`}>
                                {isApplying ? 'Submitting...' : isApplied ? (
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Applied Successfully</span>
                                ) : 'Apply Now'}
                            </Button>
                            {!user && <p className="text-xs text-center text-red-500 font-medium">You must be logged in to apply</p>}
                            <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> Posted {singleJob?.createdAt?.split("T")[0]}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <h2 className='text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6'>Job Description</h2>
                            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {singleJob?.description || "No detailed description provided for this role."}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-6 text-lg">Job Overview</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                                        <Briefcase className="w-5 h-5 text-purple-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Experience</p>
                                        <p className="font-semibold text-gray-900">{singleJob?.experience} Years</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-blue-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Applicants</p>
                                        <p className="font-semibold text-gray-900">{singleJob?.applications?.length} Candidates</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                        <IndianRupee className="w-5 h-5 text-green-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Salary</p>
                                        <p className="font-semibold text-gray-900">{singleJob?.salary} LPA</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-orange-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Location</p>
                                        <p className="font-semibold text-gray-900">{singleJob?.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default JobDescription
