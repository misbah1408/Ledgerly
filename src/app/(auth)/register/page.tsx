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
import { registerSchema } from "@/schema/RegisterSchema";
import { bgGrad } from "@/utils/constants";
import Image from "next/image";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/service/authService";

const Page = (): React.ReactElement => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      registerRequest: {
        name: "",
        email: "",
        password: "",
        role: "ADMIN",
      },
      storeRequest: {
        name: "",
        address: "",
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const res = await register({ ...values });
      console.log(res);
      if (res.status === 201) {
        router.push("/login")
        toast.success(res.data?.data?.message || "User registerd successful!");
      }
    } catch (error) {
      console.log(error);
      toast.error("");
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
          <h2 className="text-3xl font-bold mt-3">Register to Ledgerly</h2>
          <p className="text-left text-indigo-100 max-w-sm mt-3">
            Your all-in-one solution for billing, inventory, and business
            growth.
          </p>
        </div>

        {/* Right Section */}
        <div className="col-span-1 flex items-center px-10 w-full">
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Create your account
            </h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 w-full"
              >
                <FormField
                  control={form.control}
                  name="registerRequest.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Owner Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Your Name"
                          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registerRequest.email"
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
                  name="registerRequest.password"
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
                <FormField
                  control={form.control}
                  name="storeRequest.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Business Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="My Company"
                          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="storeRequest.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Business Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter address"
                          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
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
                  Register
                </Button>
                <p className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href={"/login"}>
                    <span className="text-blue-800 font-semibold">Log In</span>
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
