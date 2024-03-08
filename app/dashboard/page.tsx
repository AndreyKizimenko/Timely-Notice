import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

const DashboardPage = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <>
      <LatestIssues />
      <IssueSummary open={open} closed={closed} inProgress={inProgress} />
    </>
  );
};

export default DashboardPage;
