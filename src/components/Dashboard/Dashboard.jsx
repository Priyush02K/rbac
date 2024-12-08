import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Common/Navbar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaUsers } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { users, roles, permissions } from "../Api/MockDatas";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRoles, setTotalRoles] = useState(0);
  const [totalPermissions, setTotalPermissions] = useState(0);

  useEffect(() => {
    setTotalUsers(users.length);
    setTotalRoles(roles.length);
    setTotalPermissions(permissions.length);
  }, []);

  // Data for Pie Charts
  const userStatusData = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [
          users.filter((user) => user.status === "Active").length,
          users.filter((user) => user.status === "Inactive").length,
        ],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverBackgroundColor: ["#66BB6A", "#E57373"],
      },
    ],
  };

  const rolesData = {
    labels: roles.map((role) => role.name),
    datasets: [
      {
        data: roles.map((role) => role.users?.length || 0), // Assuming roles have a users property
        backgroundColor: ["#2196F3", "#FFC107", "#FF5722", "#9C27B0"],
        hoverBackgroundColor: ["#64B5F6", "#FFD54F", "#FF7043", "#BA68C8"],
      },
    ],
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Navbar />
      <h2 className="text-center p-10 font-bold italic">
        Welcome to the RBAC Dashboard
      </h2>
      <div className="bg-[#ededfd] rounded-lg shadow-md mt-6 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 uppercase">
          Summary Data:
        </h2>
        <div className="py-5">
          <main className="h-full overflow-y-auto">
            <div className="container mx-auto grid">
              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                {/* Total Users */}
                <Link
                  to="/users"
                  className="flex items-center p-4 rounded-lg shadow-md bg-white dark:bg-[#001F3F] hover:scale-105 hover:shadow-lg transition-transform duration-300"
                >
                  <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                    <FaUsers className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
                      Total Users
                    </p>
                    <p className="text-xl font-bold">{totalUsers}</p>
                  </div>
                </Link>

                {/* Total Roles */}
                <Link
                  to="/roles"
                  className="flex items-center p-4 bg-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                >
                  <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                    <MdSecurity className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
                      Roles
                    </p>
                    <p className="text-xl font-bold">{totalRoles}</p>
                  </div>
                </Link>

                {/* Total Permissions */}
                <Link
                  to="/permissions"
                  className="flex items-center p-4 bg-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                >
                  <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                    <FaKey className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
                      Permissions
                    </p>
                    <p className="text-xl font-bold">{totalPermissions}</p>
                  </div>
                </Link>

                {/* Active Users */}
                <Link
                  to="/users"
                  className="flex items-center p-4 bg-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                >
                  <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                    <IoMdPeople className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
                      Active Users
                    </p>
                    <p className="text-xl font-bold">
                      {users.filter((user) => user.status === "Active").length}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Data Visualization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Status Pie Chart */}
          <div className="bg-[#f9fafb] rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4 text-center">User Status</h3>
            <Pie data={userStatusData} />
          </div>

          {/* Roles Distribution Pie Chart */}
          <div className="bg-[#f9fafb] rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              Roles Distribution
            </h3>
            <Pie data={rolesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
