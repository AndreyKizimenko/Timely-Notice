import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import DataTable from "../components/DataTable";

const IssuesPage = () => {
  return (
    <div className="flex justify-center">
      <div className="space-y-2 w-5/6">
        <Button>
          <Link href="/issues/new">New issue</Link>
        </Button>
        <DataTable />
      </div>
    </div>
  );
};

export default IssuesPage;
