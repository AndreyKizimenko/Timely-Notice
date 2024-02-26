import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";
import { Grid } from "@radix-ui/themes";


const IssueDetailsPage = async ({ params: { issueID } }: { params: { issueID: string } }) => {
  const issueDetails = await prisma?.issue.findUnique({ where: { id: parseInt(issueID) } });

  if (!issueDetails) notFound();

  return (
    <Grid className="mx-16" columns="2" gap="9">
      <IssueDetails issueDetails={issueDetails} />
      <EditIssueButton issueDetails={issueDetails} />
    </Grid>
  );
};


export default IssueDetailsPage;
