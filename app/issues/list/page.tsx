import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "../../components/Link";
import StatusBadge from "../../components/StatusBadge";
import IssueActions from "./IssueActions";
import NextLink from "next/link";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
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
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issueList = await prisma?.issue.findMany({
    where: { status: status },
    orderBy,
  });

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
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <StatusBadge status={issue.status} />
                </Table.Cell>

                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{titleElipsis(issue.title)}</Link>
                </Table.Cell>

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
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
