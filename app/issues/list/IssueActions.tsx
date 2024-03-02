import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusFilter from "./StatusFilter";

const IssueActions = async () => {
  return (
    <div className="flex justify-between">
      <StatusFilter />
      <Link href="/issues/new">
        <Button className="hover:cursor-pointer">New issue</Button>
      </Link>
    </div>
  );
};

export default IssueActions;
