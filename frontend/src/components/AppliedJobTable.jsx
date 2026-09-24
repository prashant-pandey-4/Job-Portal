import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
      <Table className="min-w-[600px] sm:min-w-full">
        <TableCaption className="py-4 text-xs text-gray-500">
          A list of your applied jobs
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="font-semibold text-gray-700">Job Role</TableHead>
            <TableHead className="font-semibold text-gray-700">Company</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-50/60">
                <TableCell className="font-medium text-xs sm:text-sm">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="font-semibold text-gray-900 text-xs sm:text-sm">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="text-gray-600 text-xs sm:text-sm">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
                        : appliedJob.status === "pending"
                        ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200"
                        : "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                    } font-semibold text-xs border`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;