import React from "react";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import OverviewCard from "./OverviewCard";
import PropertyTable from "./PropertyTable";
import FinancialTable from "./FinancialTable";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <OverviewCard
              title="Number of properties"
              value="3"
              color="bg-blue-100"
            />
            <OverviewCard
              title="Average Occupancy Rate"
              value="80%"
              color="bg-green-100"
            />
            <OverviewCard
              title="Average Vacancy Rate"
              value="85%"
              color="bg-pink-100"
            />
            <OverviewCard
              title="Overall Net Profit"
              value="$50,000"
              color="bg-yellow-100"
            />
          </div>
          <PropertyTable />
          <FinancialTable />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
