import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Heading, Text } from "@radix-ui/themes";
import StatusBadge from "@/app/components/StatusBadge";


const IssueDetails = async ({ params: { issueID } }: { params: { issueID: string } }) => {
  const issueDetails = await prisma?.issue.findUnique({ where: { id: parseInt(issueID) } });

  if (!issueDetails) notFound();

  return (
    <div className="flex justify-center">
      <div className="w-5/6">
        <Heading as="h1" size={"6"}>
          {issueDetails?.title}
        </Heading>
        <div className="flex mt-2 space-x-2">
          <StatusBadge status={issueDetails.status} />
          <Text as="p">{issueDetails?.createdAt.toDateString()}</Text>
        </div>
        <p className="mt-10 p-4 w-4/6 border rounded-md">{issueDetails?.description}</p>
      </div>
    </div>
  );
};

export default IssueDetails;
