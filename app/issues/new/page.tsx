"use client";

import React from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Issue title",
        description: "Issue description which is a very long string, test description long string",
      }),
    });
  };

  return (
    <>
      <div className="flex justify-center ">
        <form className="w-2/5 space-y-3" onSubmit={handleSubmit}>
          <TextField.Root>
            <TextField.Input placeholder="Issue title" />
          </TextField.Root>
          <TextArea placeholder="Issue description" size="3" />
          <Button type="submit">Add new issue</Button>
        </form>
      </div>
    </>
  );
};

export default NewIssuePage;
