import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from the route parameter
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const back = () => {
    navigate("/jobs");
  };

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(
          `https://testapi.getlokalapp.com/common/jobs?page=1`
        );
        const data = await response.json();

        console.log("Fetched Job Detail:", data);

        if (data.results && Array.isArray(data.results)) {
          const foundJob = data.results.find(
            (job) => job.id === parseInt(id, 10)
          );

          if (foundJob) {
            setJob(foundJob);
          } else {
            throw new Error("Job not found");
          }
        } else {
          throw new Error("Job data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching job detail:", error);
        setError("Error fetching job details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (isLoading) {
    return <p className="text-center text-blue-600">Loading job details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {job?.title || "Job title not available"}
      </h1>

      <div className="mb-4">
        <p className="text-lg">
          <strong className="text-gray-600">Location:</strong>{" "}
          {job?.primary_details?.Place || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="text-gray-600">Salary:</strong>{" "}
          {job?.primary_details?.Salary || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="text-gray-600">Job Type:</strong>{" "}
          {job?.primary_details?.Job_Type || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="text-gray-600">Experience:</strong>{" "}
          {job?.primary_details?.Experience || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="text-gray-600">Fees Charged:</strong>{" "}
          {job?.primary_details?.Fees_Charged || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="text-gray-600">Qualification:</strong>{" "}
          {job?.primary_details?.Qualification || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="text-gray-600">Phone:</strong>{" "}
          {job?.whatsapp_no || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="text-gray-600">Company:</strong>{" "}
          {job?.company_name || "N/A"}
        </p>
      </div>

      <button
        onClick={back}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
      >
        Back
      </button>
    </div>
  );
};

export default JobDetails;
