import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
  switch (status) {
    case "OPEN":
      return <Badge color="gray">Open</Badge>;
    case "CLOSED":
      return <Badge color="mint">Closed</Badge>;
    case "IN_PROGRESS":
      return <Badge color="blue">In Progress</Badge>;

    default:
      break;
  }
};

export default StatusBadge;
