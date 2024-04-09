"use client";
import Skeleton from "@/app/components/Skeleton";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issueID: number;
  assignedToUserID: string | null;
}

const AssigneeDropdown = ({ issueID, assignedToUserID }: Props) => {
  const router = useRouter();
  const { isLoading, error, data: users } = useUsers();

  const handleUpdate = async (userID: string) => {
    try {
      const newAssignee = userID === "unassigned" ? null : userID;
      await axios.patch("/api/issues/" + issueID, {
        assignedToUserID: newAssignee,
      });
      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={assignedToUserID ? assignedToUserID : "unassigned"}
        onValueChange={(value) => handleUpdate(value)}
      >
        <Select.Trigger data-cy="assignee-dropdown" />
        <Select.Content position="popper" data-cy="assignee-dropdown-items">
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
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 60 * 1000, //60m
    retry: 3,
  });

export default AssigneeDropdown;
