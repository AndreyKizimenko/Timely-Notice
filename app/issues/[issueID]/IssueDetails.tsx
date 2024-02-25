import React from "react";
import { Heading, Text } from "@radix-ui/themes";
import StatusBadge from "@/app/components/StatusBadge";
import { Issue } from "@prisma/client";

const IssueDetails = ({issueDetails} : {issueDetails:Issue}) => {
  return (
    <>
      <div>
        <Heading as="h1" size={"6"}>
          {issueDetails?.title}
        </Heading>
        <div className="flex mt-2 space-x-2">
          <StatusBadge status={issueDetails.status} />
          <Text as="p">{issueDetails?.createdAt.toDateString()}</Text>
        </div>
        <p className="mt-10 p-4 border rounded-md">{issueDetails?.description}</p>
      </div>
    </>
  );
};

export default IssueDetails;
