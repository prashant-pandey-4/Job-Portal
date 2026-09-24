import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Filter, RotateCcw } from "lucide-react";

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
  const { searchedQuery } = useSelector((store) => store.job);

  const changeHandler = (value) => {
    setSelectedValue(value);
    dispatch(setSearchedQuery(value));
  };

  const clearFilterHandler = () => {
    setSelectedValue("");
    dispatch(setSearchedQuery(""));
  };

  useEffect(() => {
    if (!searchedQuery) {
      setSelectedValue("");
    }
  }, [searchedQuery]);

  return (
    <div className="w-full bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-24">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-600" />
          <h2 className="font-bold text-lg text-gray-900">Filter Jobs</h2>
        </div>
        {selectedValue && (
          <button
            onClick={clearFilterHandler}
            className="flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors bg-purple-50 px-2.5 py-1 rounded-full"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>
      <hr className="mb-5 border-gray-100" />

      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-5"
      >
        {filterData.map((data, index) => (
          <div key={index} className="space-y-3">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900">
              {data.filterType}
            </h3>
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="border-gray-300 text-purple-600 focus:ring-purple-500 data-[state=checked]:border-purple-600"
                    />
                    <Label
                      htmlFor={itemId}
                      className="text-gray-600 group-hover:text-purple-600 text-sm font-medium cursor-pointer transition-colors"
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
