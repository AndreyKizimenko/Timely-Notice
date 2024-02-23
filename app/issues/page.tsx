import React from "react";
import DataTable from "../components/DataTable";
import IssueActions from "./IssueActions";


const IssuesPage = async () => {
  

  return (
    <div className="flex justify-center">
      <div className="space-y-2 w-5/6">
        <IssueActions />
        <DataTable />
      </div>
    </div>
  );
};

export default IssuesPage;
