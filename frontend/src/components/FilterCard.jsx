import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Filter } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-purple-600" />
        <h1 className="font-bold text-lg text-gray-900">Filter Jobs</h1>
      </div>
      <hr className="mb-6 border-gray-100" />
      
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-3">
            <h2 className="font-semibold text-gray-900">{data.filterType}</h2>
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={idx} className="flex items-center space-x-3 group cursor-pointer">
                    <RadioGroupItem 
                      value={item} 
                      id={itemId} 
                      className="border-gray-300 text-purple-600 focus:ring-purple-500 data-[state=checked]:border-purple-600"
                    />
                    <Label 
                      htmlFor={itemId} 
                      className="text-gray-600 group-hover:text-purple-600 font-medium cursor-pointer transition-colors"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
