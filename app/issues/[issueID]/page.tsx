import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const IssueDetails = async ({ params: { issueID } }: { params: { issueID: string } }) => {
  if (typeof issueID !== "number") notFound();

  const issueDetails = await prisma?.issue.findUnique({ where: { id: parseInt(issueID) } });

  if (!issueDetails) notFound();

  return (
    <>
      <p>{issueDetails?.title}</p>
      <p>{issueDetails?.description}</p>
      <p>{issueDetails?.createdAt.toDateString()}</p>
      <p>{issueDetails?.updatedAt.toDateString()}</p>
    </>
  );
};

export default IssueDetails;
