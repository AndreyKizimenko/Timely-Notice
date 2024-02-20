"use client";

import React from "react";

const IssuesPage = () => {
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
    console.log(response);
  };

  return (
    <>
      <h1>Adding issues</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default IssuesPage;
