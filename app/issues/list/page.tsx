import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "../../components/Link";
import StatusBadge from "../../components/StatusBadge";
import IssueActions from "./IssueActions";
import NextLink from "next/link";
import Pagination from "@/app/components/Pagination";
import { Metadata } from "next";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const headers = [
    { value: "status", name: "Status" },
    { value: "title", name: "Title" },
    { value: "createdAt", name: "Created At" },
    { value: "updatedAt", name: "Updated At" },
  ];
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const orderBy = headers.map((header) => header.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "desc" }
    : undefined;
  const currentPage = parseInt(
    searchParams.page && !isNaN(parseInt(searchParams.page)) ? searchParams.page : "1"
  );
  const pageSize = 15;

  const issueList = await prisma?.issue.findMany({
    orderBy,
    where: { status: status },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });
  const totalIssues = await prisma.issue.count({ where: { status: status }, orderBy });
  if (!issueList) return <h1>No issues available</h1>;

  const titleElipsis = (title: string) => {
    if (title.length < 70) return title;
    else return title.slice(0, 70) + "...";
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-2 w-5/6">
        <IssueActions />

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {headers.map((header) => (
                <Table.ColumnHeaderCell key={header.value}>
                  <NextLink
                    data-cy={`t-header-${header.value}`}
                    className={header.value === searchParams.orderBy ? "underline" : ""}
                    href={{ query: { ...searchParams, orderBy: header.value } }}
                  >
                    {header.name}
                  </NextLink>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issueList.map((issue) => (
              <Table.Row key={issue.id} data-cy={`issue-${issue.id}`}>
                <Table.Cell>
                  <StatusBadge status={issue.status} />
                </Table.Cell>

                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{titleElipsis(issue.title)}</Link>
                </Table.Cell>

                <Table.Cell>{issue.createdAt.toLocaleDateString()}</Table.Cell>
                <Table.Cell>{issue.updatedAt.toLocaleDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Pagination currentPage={currentPage} itemCount={totalIssues} pageSize={pageSize} />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue tracker - List",
  description: "View all project issues",
};
export default IssuesPage;
