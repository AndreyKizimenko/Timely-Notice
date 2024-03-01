"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "@/app/components/Skeleton";

const AssigneeDropdown = () => {
  const {
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  if (error) return null;

  return (
    <>
      <Select.Root defaultValue="unassigned">
        <Select.Trigger />
        <Select.Content position="popper">
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {isLoading && (
            <div className="mt-1">
              <Skeleton count={5} />
            </div>
          )}
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.email}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeDropdown;
