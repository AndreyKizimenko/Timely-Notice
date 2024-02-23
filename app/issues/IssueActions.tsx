import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions = async () => {
  

  return (
    <Button>
      <Link href="/issues/new">New issue</Link>
    </Button>
  );
};

export default IssueActions;
