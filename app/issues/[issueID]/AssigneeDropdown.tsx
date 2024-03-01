"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeDropdown = () => {
  return (
    <>
      <Select.Root defaultValue="unassigned">
        <Select.Trigger />
        <Select.Content position="popper">
          <Select.Item value="unassigned">Unassigned</Select.Item>
          <Select.Item value="apple">User A</Select.Item>
          <Select.Item value="orange">User B</Select.Item>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeDropdown;
