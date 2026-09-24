import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Building2, MapPin } from "lucide-react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-2xl shadow-sm hover:shadow-lg bg-white border border-gray-100 hover:border-purple-200 transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="overflow-hidden">
            <h3 className="font-semibold text-base text-gray-800 group-hover:text-purple-600 transition-colors truncate">
              {job?.company?.name || "Company"}
            </h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0 text-gray-400" />
              <span className="truncate">{job?.location || "India"}</span>
            </p>
          </div>
          <Avatar className="h-11 w-11 rounded-xl border border-gray-100 bg-white p-1 shadow-2xs shrink-0">
            <AvatarImage
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="object-contain"
            />
            <AvatarFallback className="rounded-lg bg-purple-50 text-purple-700 text-xs font-bold">
              <Building2 className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="my-3">
          <h2 className="font-bold text-lg text-gray-900 group-hover:text-[#6A38C2] transition-colors line-clamp-1">
            {job?.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {job?.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-50">
        <Badge
          className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium text-xs px-2.5 py-0.5 rounded-full border-0"
        >
          {job?.position || 1} Positions
        </Badge>
        <Badge
          className="bg-red-50 text-red-700 hover:bg-red-100 font-medium text-xs px-2.5 py-0.5 rounded-full border-0"
        >
          {job?.jobType || "Full-time"}
        </Badge>
        <Badge
          className="bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold text-xs px-2.5 py-0.5 rounded-full border-0"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
