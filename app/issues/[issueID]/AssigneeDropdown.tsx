"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Skeleton from "@/app/components/Skeleton";
import { useRouter } from "next/navigation";

interface Props {
  issueID: number;
  assignedToUserID: string | null;
}

const AssigneeDropdown = ({ issueID, assignedToUserID }: Props) => {
  const router = useRouter();
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

  const handleUpdate = (userID: string) => {
    const newAssignee = userID === "unassigned" ? null : userID;
    axios.patch("/api/issues/" + issueID, {
      assignedToUserID: newAssignee,
    });
    router.refresh();
  };

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={assignedToUserID ? assignedToUserID : "unassigned"}
        onValueChange={(value) => handleUpdate(value)}
      >
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
