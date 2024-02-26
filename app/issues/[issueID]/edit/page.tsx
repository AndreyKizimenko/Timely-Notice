import React from "react";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
import { Heading } from "@radix-ui/themes";

const EditIssuePage = async ({ params: { issueID } }: { params: { issueID: string } }) => {
  const issueDetails = await prisma?.issue.findUnique({ where: { id: parseInt(issueID) } });

  if (!issueDetails) notFound();

  return (
    <>
      <div className="flex flex-col items-center">
        <Heading className="p-4">Editing issue #{issueID}</Heading>
        <IssueForm issueDetails={issueDetails} />;
      </div>
    </>
  );
};

export default EditIssuePage;
