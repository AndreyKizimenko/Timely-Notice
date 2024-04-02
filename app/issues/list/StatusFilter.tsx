"use client";
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
    const params = new URLSearchParams();
    if (selectedStatus !== "All") params.append("status", selectedStatus);
    if (searchParams.get("orderBy")) params.append("orderBy", searchParams.get("orderBy")!);
    const query = params.size ? "?" + params.toString() : "";

    router.push("/issues/list" + query);
  };

  return (
    <Select.Root defaultValue={searchParams.get("status") || "All"} onValueChange={(status) => setSearchQuery(status)}>
      <Select.Trigger data-cy="status-dropdown" className="w-40" />
      <Select.Content position="popper">
        {statuses.map((status) => (
          <Select.Item data-cy={`status-${status.value}`} key={status.value} value={status.value}>
            {status.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default StatusFilter;
