import React, { useEffect, useState, useCallback } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaPhone,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [bookmarked, setBookmarked] = useState(new Set());
  const [pagesToShow, setPagesToShow] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const totalPages = 10; // Adjust this based on your API pagination

  const fetchJobs = useCallback(async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://testapi.getlokalapp.com/common/jobs?page=${pageNumber}`
      );
      const data = await response.json();
      setJobs(data.results);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(page);
  }, [fetchJobs, page]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarked(new Set(storedBookmarks.map((job) => job.id)));
  }, []);

  useEffect(() => {
    const calculatePagesToShow = () => {
      const pages = [];
      const startPage = Math.max(1, page - 2);
      const endPage = Math.min(totalPages, startPage + 4);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      setPagesToShow(pages);
    };

    calculatePagesToShow();
  }, [page, totalPages]);

  const toggleBookmark = (job) => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const jobId = job.id;

    if (bookmarked.has(jobId)) {
      const updatedBookmarks = storedBookmarks.filter(
        (bookmark) => bookmark.id !== jobId
      );
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setBookmarked((prev) => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
      Swal.fire({
        icon: "info",
        title: "Removed from Bookmarks",
        text: `Job "${job.title}" has been removed from bookmarks.`,
        confirmButtonText: "OK",
      });
    } else {
      storedBookmarks.push(job);
      localStorage.setItem("bookmarks", JSON.stringify(storedBookmarks));
      setBookmarked((prev) => {
        const newSet = new Set(prev);
        newSet.add(jobId);
        return newSet;
      });
      Swal.fire({
        icon: "success",
        title: "Added to Bookmarks",
        text: `Job "${job.title}" has been added to bookmarks.`,
        confirmButtonText: "OK",
      });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  const handleViewDetails = (jobId) => {
    navigate(`/jobs/${jobId}`); // Navigate to job details page
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
        <div className="text-xl font-semibold text-gray-700">
          Loading Jobs...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pb-20  bg-gray-400">
        <h1 className="text-2xl text-center font-bold text-black-500 mb-6">
          Jobs
        </h1>
        {jobs.length === 0 ? (
          <div className="text-center text-gray-500">No jobs found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-zinc-100 border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col justify-between h-full relative"
              >
                <button
                  onClick={() => toggleBookmark(job)}
                  className="absolute top-2 right-2 text-gray-800 hover:text-gray-800 focus:outline-none"
                >
                  {bookmarked.has(job.id) ? (
                    <GoBookmarkFill className="h-6 w-6" />
                  ) : (
                    <GoBookmark className="h-6 w-6" />
                  )}
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Job Name: {job.title}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaBriefcase className="h-5 w-5 mr-2 text-indigo-600" />
                    <span className="truncate">
                      Company Name: {job.company_name}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="h-5 w-5 mr-2 text-green-500" />
                    <span className="truncate">
                      Location: {job.job_location_slug}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaDollarSign className="h-5 w-5 mr-2 text-yellow-500" />
                    <span className="truncate">
                      Salary: {job.salary_max || "Not Disclosed"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaPhone className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="truncate">
                      Phone Number: {job.whatsapp_no}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails(job.id)}
                  className="block text-center  bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-indigo-500"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <nav
          aria-label="Page navigation example"
          className="mt-6 flex justify-center"
        >
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </button>
            </li>

            {pagesToShow.map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => handlePageChange(pageNumber)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    page === pageNumber
                      ? "text-blue-600 border border-blue-300 bg-blue-50"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-s-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Jobs;
