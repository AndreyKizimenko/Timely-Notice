import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions = async () => {
  return (
    <Link href="/issues/new">
      <Button className="hover:cursor-pointer">New issue</Button>
    </Link>
  );
};

export default IssueActions;
