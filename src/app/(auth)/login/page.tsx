"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { bgGrad } from "@/utils/constants";
import Image from "next/image";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { loginSchema } from "@/schema/LoginSchema";
// import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { login } from "@/service/authService";

const Page = (): React.ReactElement => {
  // const [verifed, setVerifed] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [otp, setOtp] = useState("");
  // const [timer, setTimer] = useState(30); // ⏳ 30 sec countdown
  // const [isResendEnabled, setIsResendEnabled] = useState(false);
  const router = useRouter();
  // const { login } = useUser();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log(values);

    try {
      const res = await login(values);
      console.log("Login response:", res);

      if (res.status === 200) {
        // Store user as JSON string in localStorage
        localStorage.setItem("token", JSON.stringify(res.data.data.user));
        // login(res.data.user);

        toast.success(res.data?.message || "Login successful!");

        router.push("/dashboard");
      } else {
        toast.error(res.data?.error || "Login failed, please try again.");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);

      // Handle API error responses if available
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-linear-to-br from-indigo-100 via-white to-indigo-50">
      <div className="grid h-[75%] w-[55%] grid-cols-2 rounded-3xl overflow-hidden shadow-xl bg-white">
        {/* Left Section */}
        <div
          className="col-span-1 flex flex-col text-white p-10 gap-3  "
          style={bgGrad}
        >
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="logo"
              width={80}
              height={80}
              priority
              className="bg-white rounded-2xl"
            />
          </div>
          <h2 className="text-3xl font-bold mt-3">Login to Ledgerly</h2>
          <p className="text-left text-indigo-100 max-w-sm mt-3">
            Your all-in-one solution for billing, inventory, and business
            growth.
          </p>
        </div>

        {/* Right Section */}
        <div className="col-span-1 flex items-center p-10 w-full">
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Login to your account
            </h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 w-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-5 rounded-lg transition text-white font-semibold shadow-md bg-[#3a49cc] hover:bg-[#3a49cc]/90"
                >
                  Login
                </Button>
                <p className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href={"/register"}>
                    <span className="text-blue-800 font-semibold">Register</span>
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
