"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeDropdown = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("/api/users");
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Select.Root defaultValue="unassigned">
        <Select.Trigger />
        <Select.Content position="popper">
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeDropdown;
