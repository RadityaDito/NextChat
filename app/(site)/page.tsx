import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center bg-gray-100 ">
      <div className="w-full max-w-md mx-auto">
        <Image
          alt="logo"
          height={48}
          width={48}
          className="mx-auto"
          src={"/images/logo.png"}
        />
        {/* <h2 className="font-bold text-3xl text-center mt-6 tracking-tight text-gray-900">
          Sign in to your account
        </h2> */}
      </div>
      <AuthForm />
    </div>
  );
}
