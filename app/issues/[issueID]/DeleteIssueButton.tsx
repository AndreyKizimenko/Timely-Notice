"use client";
import { AlertDialog, Button, Callout, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete("/api/issues/" + issueID);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("An unexpected error has occured");
    }
  };

  return (
    <div>
      <AlertDialog.Root>
        <div className="flex items-center gap-4">
          <AlertDialog.Trigger>
            <Button color="red">Delete Issue</Button>
          </AlertDialog.Trigger>
          {error && (
            <Callout.Root size="1" className="w-2/5" color="red">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
        </div>
        <AlertDialog.Content style={{ maxWidth: 500 }}>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action is permanent and cannot be
            undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={() => handleDelete()} variant="solid" color="red">
                Delete issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteIssueButton;
