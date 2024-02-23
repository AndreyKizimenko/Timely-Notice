import { Badge } from "@radix-ui/themes";
import React from "react";

const StatusBadge = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case "open":
      return <Badge color="gray">Open</Badge>;
    case "closed":
      return <Badge color="mint">Closed</Badge>;
    case "in_progress":
      return <Badge color="blue">In Progress</Badge>;

    default:
      break;
  }
};

export default StatusBadge;
