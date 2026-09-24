import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./shared/Footer";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full space-y-6">
        {/* Profile Card */}
        <div className="bg-white border border-gray-100 sm:border-gray-200 rounded-2xl p-5 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-purple-100 shrink-0">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  }
                  alt={user?.fullname}
                />
              </Avatar>
              <div>
                <h1 className="font-bold text-xl sm:text-2xl text-gray-900">
                  {user?.fullname}
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  {user?.profile?.bio || "No bio added yet"}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700 hover:text-purple-700 rounded-xl shrink-0"
            >
              <Pen className="w-4 h-4" />
              <span>Edit Profile</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              <Mail className="w-4 h-4 text-purple-600 shrink-0" />
              <span className="truncate">{user?.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              <Contact className="w-4 h-4 text-purple-600 shrink-0" />
              <span>{user?.phoneNumber || "N/A"}</span>
            </div>
          </div>

          <div className="my-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills && user?.profile?.skills.length > 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium text-xs px-3 py-1 rounded-full border-0"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-400">No skills added yet</span>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Label className="text-sm font-semibold text-gray-700 block mb-2">
              Resume
            </Label>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={user?.profile?.resume}
                className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 hover:underline font-medium bg-purple-50/80 px-4 py-2 rounded-xl border border-purple-100"
              >
                <FileText className="w-4 h-4" />
                <span className="truncate max-w-[260px] sm:max-w-md">
                  {user?.profile?.resumeOriginalName || "Download Resume"}
                </span>
              </a>
            ) : (
              <span className="text-sm text-gray-400">No resume uploaded</span>
            )}
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white border border-gray-100 sm:border-gray-200 rounded-2xl p-5 sm:p-8 shadow-xs">
          <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-4">
            Applied Jobs
          </h2>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;