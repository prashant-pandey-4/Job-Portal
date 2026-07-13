import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Building2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const myCompany = companies?.[0]; // Their one and only company

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if(!myCompany) {
            toast.error("You must register a company first.");
            return;
        }

        const jobData = {
            ...input,
            companyId: myCompany._id
        };

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, jobData,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post job.");
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className='flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full'>
                
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="mb-8">
                        <h1 className='font-extrabold text-2xl text-gray-900'>Post a New Job</h1>
                        {myCompany && (
                            <div className="flex items-center gap-2 mt-2 text-gray-600 bg-purple-50 px-4 py-2 rounded-xl w-fit">
                                <Building2 className="w-4 h-4 text-purple-600" />
                                <span className="font-medium">Posting on behalf of <span className="text-purple-700">{myCompany.name}</span></span>
                            </div>
                        )}
                    </div>

                    <form onSubmit = {submitHandler}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className="space-y-2">
                                <Label className="text-gray-700 font-semibold">Job Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
                                    placeholder="e.g. Frontend Developer"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700 font-semibold">Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
                                    placeholder="e.g. Bangalore, India"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700 font-semibold">Salary (LPA)</Label>
                                <Input
                                    type="number"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
                                    placeholder="e.g. 12"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700 font-semibold">Experience Level (Years)</Label>
                                <Input
                                    type="number"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
                                    placeholder="e.g. 2"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700 font-semibold">Job Type</Label>
                                <Input
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
                                    placeholder="e.g. Full-time, Remote"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700 font-semibold">No of Positions</Label>
                                <Input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
                                    placeholder="e.g. 5"
                                    required
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-gray-700 font-semibold">Requirements (comma separated)</Label>
                                <Input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
                                    placeholder="e.g. React, Node.js, MongoDB"
                                    required
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-gray-700 font-semibold">Job Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
                                    placeholder="Describe the responsibilities and role..."
                                    required
                                />
                            </div>
                        </div> 
                        
                        <div className="mt-8">
                            {
                                loading ? (
                                    <Button disabled className="w-full rounded-xl py-6 text-lg"> 
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Submitting... 
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full rounded-xl py-6 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-300 transition-all duration-300">
                                        Post New Job
                                    </Button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob