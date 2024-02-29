"use client";
import { Heading, TextField } from "@radix-ui/themes";
import { registerSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { FormError } from "@/app/components";
import SubmitButton from "@/app/components/SubmitButton";

type FormData = z.infer<typeof registerSchema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <>
      <form className="flex flex-col items-center gap-10" onSubmit={handleSubmit(onSubmit)}>
        <Heading>Sign Up</Heading>
        <div className="w-2/5 flex flex-col gap-2">
          <div className="flex justify-between">
            <label htmlFor="email-address">Email</label>
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>
          <TextField.Input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />

          <div className="flex justify-between">
            <label htmlFor="password">Password</label>
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </div>
          <TextField.Input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          <div className="flex justify-between">
            <label htmlFor="confirmPassword">Confirm password</label>
            {errors.confirmPassword && <FormError>{errors.confirmPassword.message}</FormError>}
          </div>
          <TextField.Input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", { required: true })}
          />
          <div>
            <SubmitButton
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
