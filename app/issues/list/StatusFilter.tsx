"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const StatusFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const statuses = [
    { value: "All", name: "All" },
    { value: "OPEN", name: "Open" },
    { value: "IN_PROGRESS", name: "In Progress" },
    { value: "CLOSED", name: "Closed" },
  ];

  const setSearchQuery = (selectedStatus: string) => {    
    const baseURL = `/issues/list`;
    const status = selectedStatus !== "All" ? baseURL + "?status=" + selectedStatus : baseURL;

    if (searchParams.get("orderBy")) {
      router.push(`${status}&orderBy=${searchParams.get("orderBy")}`);
    } else router.push(`${status}`);
  };

  return (
    <Select.Root onValueChange={(status) => setSearchQuery(status)}>
      <Select.Trigger className="w-40" />
      <Select.Content position="popper">
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default StatusFilter;
