import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useJobStore } from "../../store/jobStore";

const JobFilters: React.FC = () => {
  const filters = useJobStore((state) => state.filters);
  const setFilters = useJobStore((state) => state.setFilters);
  const resetFilters = useJobStore((state) => state.resetFilters);
  const setPage = useJobStore((state) => state.setPage);
  const queryClient = useQueryClient();

  // Local state for salary range slider
  const [salaryRange, setSalaryRange] = useState({
    min: filters.minSalary || 0,
    max: filters.maxSalary || 200000,
  });

  // Individual handler functions for each field type
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, title: event.target.value };
    setFilters(newFilters);
    setPage(1);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, location: event.target.value };
    setFilters(newFilters);
    setPage(1);
  };

  const handleRemoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, isRemote: event.target.checked };
    setFilters(newFilters);
    setPage(1);
  };

  // Handle category changes
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentCategories = [...(filters.category || [])];
    let newCategories;

    if (checked) {
      if (!currentCategories.includes(value)) {
        newCategories = [...currentCategories, value];
      } else {
        newCategories = currentCategories;
      }
    } else {
      newCategories = currentCategories.filter((cat) => cat !== value);
    }
    const newFilters = { ...filters, category: newCategories };
    setFilters(newFilters);
    setPage(1);
  };

  // Handle salary range changes
  const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10) || 0;

    setSalaryRange((prev) => ({
      ...prev,
      min: newValue,
    }));

    const newFilters = { ...filters, minSalary: newValue };
    setFilters(newFilters);
    setPage(1);
  };

  const handleMaxSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10) || 0;

    setSalaryRange((prev) => ({
      ...prev,
      max: newValue,
    }));

    const newFilters = { ...filters, maxSalary: newValue };
    setFilters(newFilters);
    setPage(1);
  };

  const handleApplyFilters = () => {
    setPage(1);
    queryClient.invalidateQueries("jobs");
  };

  // Reset all filters
  const handleResetFilters = () => {
    resetFilters();
    setSalaryRange({ min: 0, max: 200000 });
    setPage(1);
    queryClient.invalidateQueries("jobs");
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Explore suggested searches</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Search by title"
          value={filters.title || ""}
          onChange={handleTitleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          placeholder="Filter by location"
          value={filters.location || ""}
          onChange={handleLocationChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="remote"
          checked={filters.isRemote === true}
          onChange={handleRemoteChange}
          className="mr-2"
        />
        <label htmlFor="remote" className="text-sm">
          Remote Work
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2 text-sm">Job Type</h3>
        <div className="pl-2">
          <div className="mb-1 flex items-center">
            <input
              type="checkbox"
              id="internship"
              value="internship"
              checked={filters.category?.includes("internship") || false}
              onChange={handleCategoryChange}
              className="mr-2"
            />
            <label htmlFor="internship" className="text-sm">
              Internship
            </label>
          </div>
          <div className="mb-1 flex items-center">
            <input
              type="checkbox"
              id="part-time"
              value="part-time"
              checked={filters.category?.includes("part-time") || false}
              onChange={handleCategoryChange}
              className="mr-2"
            />
            <label htmlFor="part-time" className="text-sm">
              Part-time
            </label>
          </div>
          <div className="mb-1 flex items-center">
            <input
              type="checkbox"
              id="full-time"
              value="full-time"
              checked={filters.category?.includes("full-time") || false}
              onChange={handleCategoryChange}
              className="mr-2"
            />
            <label htmlFor="full-time" className="text-sm">
              Full-time
            </label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2 text-sm">Salary Range</h3>
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>${salaryRange.min.toLocaleString()}</span>
            <span>${salaryRange.max.toLocaleString()}</span>
          </div>
          <input
            type="range"
            name="minSalary"
            min="0"
            max="200000"
            step="5000"
            value={salaryRange.min}
            onChange={handleMinSalaryChange}
            className="w-full"
          />
          <input
            type="range"
            name="maxSalary"
            min="0"
            max="200000"
            step="5000"
            value={salaryRange.max}
            onChange={handleMaxSalaryChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleApplyFilters}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Apply
        </button>
        <button
          onClick={handleResetFilters}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default JobFilters;
