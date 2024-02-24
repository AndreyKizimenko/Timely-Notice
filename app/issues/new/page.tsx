"use client";
import { FormError, Spinner } from "@/app/components";
import { newIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof newIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(newIssueSchema) });
  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error has occured");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {error && (
        <Callout.Root size="1" className="w-2/5 mb-4" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="w-2/5" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input
            placeholder="Issue title"
            {...register("title", { required: true })}
            aria-invalid={errors.title ? "true" : "false"}
          />
        </TextField.Root>
        {errors.title && <FormError>{errors.title.message}</FormError>}
        <TextArea
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
          <Button type="submit">Add new issue</Button>
        )}
      </form>
    </div>
  );
};

export default NewIssuePage;
