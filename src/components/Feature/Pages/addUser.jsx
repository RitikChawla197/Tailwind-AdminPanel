import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { RegisterUserApi } from "@/api/Api";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserApi } from "@/api/Api";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter an email." })
    .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: "Please enter a valid email address.",
    }),
  user_id: z
    .string()
    .min(1, { message: "Please enter a valid User ID (numerical)." })
    .regex(/^\d+$/, { message: "User ID must be numerical." }),
  name: z.string().min(1, { message: "Please enter a name." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." })
    .regex(/^(?!\d+$).+$/, { message: "Password cannot be entirely numeric." }),
  password2: z.string().min(1, { message: "Please confirm password." }),
  type: z.enum(["View", "Edit", "Analysis", "Admin"], {
    message: "Please select a user type.",
  }),
}).refine((data) => data.password === data.password2, {
  message: "Passwords do not match.",
  path: ["password2"],
});

export default function AddUser() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      user_id: "",
      name: "",
      password: "",
      password2: "",
      type: "View",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseButtonClick = () => {
    dispatch(AdminCentralDataStatus("Userinfo"));
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(RegisterUserApi(data)).unwrap();
      dispatch(AdminCentralDataStatus("Userinfo"));
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="bg-background  py-3 px-6">
        <h3 className="text-foreground text-2xl font-bold">Users</h3>
        <h6 className="text-muted-foreground mb-4">Add user</h6>
    <Card className="shadow-sm border-border">
       
    <CardContent className="p-2 overflow-y-auto">
          <p className="text-muted-foreground mb-4">
            First, enter your email, name, and password. Then, you’ll be able to
            edit more user options.
          </p>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter numerical User ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          {...field}
                        />
                       <Button
  type="button"  // ✅ Add this
  variant="ghost"
  size="icon"
  className="absolute right-2 top-1/2 -translate-y-1/2"
  onClick={togglePasswordVisibility}
>
  {showPassword ? (
    <EyeOff className="h-4 w-4" />
  ) : (
    <Eye className="h-4 w-4" />
  )}
</Button>

                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm text-muted-foreground">
                <ul className="list-disc pl-4">
                  <li>
                    Your password can’t be too similar to your other personal
                    information.
                  </li>
                  <li>Your password must contain at least 8 characters.</li>
                  <li>Your password can’t be a commonly used password.</li>
                  <li>Your password can’t be entirely numeric.</li>
                </ul>
              </div>
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Confirmation</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          {...field}
                        />
                        <Button
  type="button"  // ✅ Add this
  variant="ghost"
  size="icon"
  className="absolute right-2 top-1/2 -translate-y-1/2"
  onClick={togglePasswordVisibility}
>
  {showPassword ? (
    <EyeOff className="h-4 w-4" />
  ) : (
    <Eye className="h-4 w-4" />
  )}
</Button>

                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm text-muted-foreground">
                Enter the same password as before, for verification.
              </p>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="View">View</SelectItem>
                        <SelectItem value="Edit">Edit</SelectItem>
                        <SelectItem value="Analysis">Analysis</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-end">
                <Button type="submit">Save</Button>
                {/* <Button variant="destructive">Delete</Button> */}
                <Button variant="outline" onClick={handleCloseButtonClick}>
                  Close
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}