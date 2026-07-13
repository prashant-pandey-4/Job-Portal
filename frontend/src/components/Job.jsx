import React from "react";
import { Button } from "./ui/button";
import { BookmarkIcon, MapPin, Briefcase, Clock } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    if(!mongodbTime) return 0;
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="border border-gray-100 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 bg-white group cursor-pointer flex flex-col justify-between" onClick={() => navigate(`/description/${job?._id}`)}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4">
            <Avatar className="h-14 w-14 rounded-xl border border-gray-100 bg-white shadow-sm p-1">
              <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className="object-contain" />
            </Avatar>
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">{job?.title}</h3>
              <p className="text-sm text-gray-500 font-medium">{job?.company?.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full" onClick={(e) => { e.stopPropagation(); }}>
            <BookmarkIcon className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
          {job?.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-gray-100 font-normal">
            <MapPin className="w-3 h-3 mr-1" /> {job?.location}
          </Badge>
          <Badge variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-gray-100 font-normal">
            <Briefcase className="w-3 h-3 mr-1" /> {job?.jobType}
          </Badge>
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium">
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
        <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
          <Clock className="w-3 h-3" /> 
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </span>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 h-9 shadow-sm shadow-purple-200">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default Job;
