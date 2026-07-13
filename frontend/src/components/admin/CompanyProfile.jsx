import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Building2, MapPin, Globe, Edit2, ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanyProfile = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const { singleCompany } = useSelector(store => store.company);
    const navigate = useNavigate();

    if (!singleCompany) return null;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className='flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full'>
                
                <div className='flex items-center gap-5 mb-8'>
                    <Button 
                        type="button"
                        onClick={() => navigate("/admin/jobs")} 
                        variant="outline" 
                        className="flex items-center gap-2 text-gray-500 font-semibold rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4"/>
                        <span>Back to Jobs</span>
                    </Button>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-8">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden p-2">
                                {singleCompany.logo ? (
                                    <img src={singleCompany.logo} alt="logo" className="w-full h-full object-contain" />
                                ) : (
                                    <Building2 className="w-10 h-10 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <h1 className='font-extrabold text-3xl text-gray-900 mb-2'>{singleCompany.name}</h1>
                                <div className="flex items-center gap-4 text-gray-500 font-medium">
                                    {singleCompany.location && (
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{singleCompany.location}</span>
                                        </div>
                                    )}
                                    {singleCompany.website && (
                                        <div className="flex items-center gap-1 text-purple-600 hover:underline">
                                            <Globe className="w-4 h-4" />
                                            <a href={singleCompany.website} target="_blank" rel="noopener noreferrer">Website</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <Button 
                            onClick={() => navigate(`/admin/companies/${singleCompany._id}/edit`)}
                            className="rounded-xl py-6 px-6 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-300 transition-all duration-300 flex items-center gap-2"
                        >
                            <Edit2 className="w-5 h-5" /> Edit Profile
                        </Button>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl text-gray-900 mb-4">About the Company</h2>
                        <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {singleCompany.description || "No description provided yet. Click 'Edit Profile' to add one."}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CompanyProfile
