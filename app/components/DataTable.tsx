import { Table } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "./StatusBadge";

const DataTable = async () => {
  const issueList = await prisma?.issue.findMany({ orderBy: [{ status: "asc" }] });

  if (!issueList) return <h1>No issues available</h1>;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Updated</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issueList.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <StatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell>{issue.title}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toLocaleDateString()}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.updatedAt.toLocaleDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default DataTable;
