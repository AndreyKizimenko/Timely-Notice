import { Issue } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueID }: { issueID: number }) => {
  return (
    <div className="flex">
      <Link href={`/issues/edit/${issueID}`} data-cy="edit-issue-button">
        <Button>Edit Issue</Button>
      </Link>
    </div>
  );
};

export default EditIssueButton;
