"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import { FormError, Spinner } from "@/app/components";
import { newIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Issue } from "@prisma/client";

type FormData = z.infer<typeof newIssueSchema>;

interface Props {
  issueDetails?: Issue;
}

const IssueForm = ({ issueDetails }: Props) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit = async (data: FieldValues) => {
    try {
      if (issueDetails) await axios.patch(`/api/issues/${issueDetails?.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setError("An unexpected error has occured");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(newIssueSchema) });

  return (
    <>
      {error && (
        <Callout.Root size="1" className="w-2/5 mb-4" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="w-2/5" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issueDetails?.title}
            placeholder="Issue title"
            {...register("title", { required: true })}
            aria-invalid={errors.title ? "true" : "false"}
          />
        </TextField.Root>
        {errors.title && <FormError>{errors.title.message}</FormError>}
        <TextArea
          defaultValue={issueDetails?.description}
          className="my-4"
          size="3"
          placeholder="Issue description"
          {...register("description", { required: true })}
          aria-invalid={errors.description ? "true" : "false"}
        />
        {errors.description && <FormError>{errors.description.message}</FormError>}
        
        {isSubmitting ? (
          <Button disabled type="submit">
            <Spinner />
            Adding...
          </Button>
        ) : (
          <Button type="submit">{issueDetails ? "Update issue" : "Add new issue"}</Button>
        )}
        
      </form>
    </>
  );
};

export default IssueForm;
