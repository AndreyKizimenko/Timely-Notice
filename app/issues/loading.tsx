import { Table } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";
import IssueActions from "./IssueActions";

const LoadingIssuesPage = () => {
  const tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="flex justify-center">
      <div className="space-y-2 w-5/6">
        <IssueActions />
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Updated
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tempArray.map((issue) => (
              <Table.Row key={issue}>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default LoadingIssuesPage;
