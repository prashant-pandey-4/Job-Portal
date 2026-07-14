import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, CheckCircle2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        let formattedWebsite = input.website.trim();
        if (formattedWebsite && !/^https?:\/\//i.test(formattedWebsite)) {
            formattedWebsite = `https://${formattedWebsite}`;
        }
        formData.append("website", formattedWebsite);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success("Company profile saved successfully!");
                navigate(`/admin/companies/${params.id}`); // Route to profile after setup
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className='flex-grow max-w-2xl mx-auto px-4 sm:px-6 py-10 w-full'>
                <form onSubmit={submitHandler} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    
                    <div className='flex items-center gap-5 mb-8'>
                        <Button 
                            type="button"
                            onClick={() => navigate(`/admin/companies/${params.id}`)} 
                            variant="outline" 
                            className="flex items-center gap-2 text-gray-500 font-semibold rounded-xl"
                        >
                            <ArrowLeft className="w-4 h-4"/>
                            <span>Back</span>
                        </Button>
                        <h1 className='font-extrabold text-2xl text-gray-900'>Edit Company Profile</h1>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-semibold">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
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
                                placeholder="e.g. San Francisco, CA"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-gray-700 font-semibold">Website URL</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
                                placeholder="example.com"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-gray-700 font-semibold">Company Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-5"
                                placeholder="What does your company do?"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-gray-700 font-semibold">Company Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        {
                            loading ? (
                                <Button disabled className="w-full rounded-xl py-6 text-lg"> 
                                    <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Saving Profile... 
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full rounded-xl py-6 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-300 transition-all duration-300 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> Save & Continue
                                </Button>
                            )
                        }
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup