"use client";
import { Callout, Heading, TextField } from "@radix-ui/themes";
import { registerSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { FormError } from "@/app/components";
import SubmitButton from "@/app/components/SubmitButton";
import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";

type FormData = z.infer<typeof registerSchema>;

const SignUpPage = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post("/api/auth/register", data);
      if (response.status === 201) {
        try {
          await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: true,
            callbackUrl: "http://localhost:3000",
          });
        } catch (error) {
          setError("An unexpected error has occured");
        }
      }
      setError("");
    } catch (error) {
      console.log(error);
      if (
        axios.isAxiosError(error) &&
        error.response?.data.message == "Email address is already in use"
      ) {
        setError(error.response?.data.message);
      } else setError("An unexpected error has occured");
    }
  };
  return (
    <>
      <form data-cy="signup-form" className="flex flex-col items-center gap-10" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Callout.Root size="1" className="w-2/5 mb-4" color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Heading data-cy="signup-heading">Sign Up</Heading>
        <div className="w-2/5 flex flex-col gap-2">
          <div className="flex justify-between">
            <label htmlFor="name">Name</label>
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </div>
          <TextField.Input
            data-cy="name-input"
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />

          <div className="flex justify-between">
            <label htmlFor="email-address">Email</label>
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>
          <TextField.Input
            data-cy="email-input"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />

          <div className="flex justify-between">
            <label htmlFor="password">Password</label>
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </div>
          <TextField.Input
            data-cy="password-input"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          <div className="flex justify-between">
            <label htmlFor="confirmPassword">Confirm password</label>
            {errors.confirmPassword && <FormError>{errors.confirmPassword.message}</FormError>}
          </div>
          <TextField.Input
            data-cy="password-confirm-input"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", { required: true })}
          />
          <div>
            <SubmitButton
              data-cy="submit-button"
              isSubmitting={isSubmitting}
              defaultText="Sign Up"
              submittingText="Signing up..."
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUpPage;
