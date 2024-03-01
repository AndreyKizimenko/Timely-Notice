import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";
import { Grid } from "@radix-ui/themes";
import DeleteIssueButton from "./DeleteIssueButton";
import AssigneeDropdown from "./AssigneeDropdown";

const IssueDetailsPage = async ({ params: { issueID } }: { params: { issueID: string } }) => {
  const issueDetails = await prisma?.issue.findUnique({ where: { id: parseInt(issueID) } });

  if (!issueDetails) notFound();

  return (
    <Grid className="mx-16" columns="5" gap="9">
      <div className="col-span-4">
        <IssueDetails issueDetails={issueDetails} />
      </div>
      <div className="col-span-1 flex flex-col gap-4">
        <EditIssueButton issueID={issueDetails.id} />
        <DeleteIssueButton issueID={issueDetails.id} />
        <AssigneeDropdown issueID={issueDetails.id} assignedToUserID={issueDetails.assignedToUserID} />
      </div>
    </Grid>
  );
};

export default IssueDetailsPage;
