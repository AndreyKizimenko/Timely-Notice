import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

const DashboardPage = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <Grid gap="5" columns={{ initial: "1", md: "2" }}>
      <Flex gap="5" direction={"column"}>
        <IssueSummary open={open} closed={closed} inProgress={inProgress} />
        <IssueChart open={open} closed={closed} inProgress={inProgress} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default DashboardPage;
