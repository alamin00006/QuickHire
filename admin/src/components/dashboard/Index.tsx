"use client";

import { DashboardHeader } from "@/components/admin/DashboardHeader";

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <DashboardHeader />
        {/* <TimeFilter activeFilter={timeFilter} onFilterChange={setTimeFilter} /> */}
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground py-4 border-t">
        © QuickHire. 2021-2026 QuickHire.
        <span className="ml-4">Business setup</span>
        <span className="ml-4">Profile</span>
        <span className="ml-4">Home</span>
        <span className="ml-4 text-primary">Software Version : 3.6</span>
      </footer>
    </div>
  );
};

export default Index;
