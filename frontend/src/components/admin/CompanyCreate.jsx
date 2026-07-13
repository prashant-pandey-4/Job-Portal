import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowRight } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if(!companyName) {
            toast.error("Company name is required!");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success("Great! Let's set up your profile.");
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}/edit`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to register company");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className='flex-grow flex items-center justify-center p-4'>
                <div className='max-w-lg w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-10'>
                    
                    <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6 mx-auto">
                        <Building2 className="w-8 h-8 text-purple-600" />
                    </div>

                    <div className='text-center mb-10'>
                        <h1 className='font-extrabold text-3xl text-gray-900 mb-2'>Welcome to JobPortal</h1>
                        <p className='text-gray-500'>Let's get started by setting up your company profile. What is the name of your company?</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-semibold">Company Name</Label>
                            <Input
                                type="text"
                                className="bg-gray-50 border-gray-200 focus-visible:ring-purple-500 rounded-xl py-6 text-lg"
                                placeholder="e.g. Google, Microsoft, Startup Inc."
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>

                        <div className='flex items-center gap-3 pt-6'>
                            <Button 
                                variant="outline" 
                                className="flex-1 rounded-xl py-6 text-lg"
                                onClick={() => navigate("/")}
                            >
                                Cancel
                            </Button>
                            <Button 
                                disabled={loading}
                                className="flex-1 rounded-xl py-6 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-300 transition-all duration-300 flex items-center gap-2"
                                onClick={registerNewCompany}
                            >
                                {loading ? "Saving..." : "Continue"}
                                {!loading && <ArrowRight className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate