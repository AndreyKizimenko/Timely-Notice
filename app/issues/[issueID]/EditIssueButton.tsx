import { Issue } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueDetails }: { issueDetails: Issue }) => {
  return (
    <div className="flex">
      <Link href={`/issues/${issueDetails.id}/edit`}>
        <Button>Edit Issue</Button>
      </Link>
    </div>
  );
};

export default EditIssueButton;
