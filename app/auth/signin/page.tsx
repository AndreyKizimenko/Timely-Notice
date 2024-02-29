"use client";
import { Button, Heading, TextField } from "@radix-ui/themes";
import { loginSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { FormError, Spinner } from "@/app/components";
import SubmitButton from "@/app/components/SubmitButton";
import Link from "next/link";
type FormData = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <form className="flex flex-col items-center gap-10" onSubmit={handleSubmit(onSubmit)}>
        <Heading>Sign In</Heading>
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

          <div className="flex justify-between mt-2">
            <SubmitButton
              isSubmitting={isSubmitting}
              defaultText="Sign In"
              submittingText="Signing in..."
            />
            <div>
              <Link href={"/auth/signup"}>
                <Button variant="outline">Create a new account</Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignInPage;
