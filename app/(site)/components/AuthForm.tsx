"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import AuthSocialButton from "./AuthSocialButton";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  console.log(session);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      //Axios Register
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }
    if (variant === "LOGIN") {
      //NextAuth SignIn
      signIn("credentials", {
        ...data,
        redirect: false, //Add redirect to data object
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    //NextAuth Social SignIn
    signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error("Invalid Credentials");
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in!");
      }
    });
  };

  return (
    <>
      <h2 className="font-bold text-3xl text-center mt-6 tracking-tight text-gray-900">
        {variant === "REGISTER"
          ? "Create an account"
          : "Sign in to your account"}
      </h2>
      <div className="mt-8 mx-auto w-full max-w-md">
        <div className="bg-white shadow sm:rounded-lg px-4 py-8 sm:px-10 ">
          <div className=" flex  mt-3 gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 ">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {variant === "REGISTER" && (
                <Input
                  id="name"
                  label="Name"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
              )}
              <Input
                id="email"
                label="Email address"
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <Button disabled={isLoading} fullWidth type="submit">
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </form>
          </div>
          <div className="mt-6 text-gray-500 text-sm px-2 flex justify-center gap-2">
            <div className="">
              {variant === "LOGIN"
                ? "New to Messenger?"
                : "Already have an account?"}
            </div>
            <div className="underline cursor-pointer" onClick={toggleVariant}>
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
