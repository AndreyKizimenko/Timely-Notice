"use client";
import { Button, Callout, Heading, Separator, TextField } from "@radix-ui/themes";
import { loginSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { FormError } from "@/app/components";
import SubmitButton from "@/app/components/SubmitButton";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
type FormData = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const searchParams = useSearchParams();
  const loginError = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: FieldValues) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: callbackUrl || "http://localhost:3000",
    });
  };

  return (
    <>
      <form className="flex flex-col items-center gap-10" onSubmit={handleSubmit(onSubmit)}>
        <Heading>Sign In</Heading>
        {!!loginError && (
          <Callout.Root size="1" className="w-2/5 mb-4" color="red">
            <Callout.Text>Authentication Failed</Callout.Text>
          </Callout.Root>
        )}
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
      <Separator orientation="horizontal" size="4" className="my-10" />
      <div className="flex justify-center">
        <Button
          className="w-2/6 flex justify-between"
          onClick={() =>
            signIn("google", {
              callbackUrl: callbackUrl ? callbackUrl : "http://localhost:3000",
            })
          }
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-icon="google"
            className="w-5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="red"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          <p>Continue with Google</p>
        </Button>
      </div>
    </>
  );
};

export default SignInPage;
