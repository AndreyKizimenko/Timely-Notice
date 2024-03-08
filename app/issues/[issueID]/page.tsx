import prisma from "@/prisma/client";
import { Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import AssigneeDropdown from "./AssigneeDropdown";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
        <AssigneeDropdown
          issueID={issueDetails.id}
          assignedToUserID={issueDetails.assignedToUserID}
        />
      </div>
    </Grid>
  );
};

export async function generateMetadata({ params }: { params: { issueID: string } }) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.issueID) } });
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailsPage;
