import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/Layout/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    // Optional: check login
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    fetchAllResumes();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your Resumes
        </h2>

        {/* Example display */}
        {allResumes && allResumes.length > 0 ? (
          <ul className="space-y-3">
            {allResumes.map((resume) => (
              <li
                key={resume._id}
                className="p-3 border rounded-md shadow-sm bg-white hover:shadow-md transition"
              >
                {resume.title || "Untitled Resume"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No resumes found. Create one!</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
