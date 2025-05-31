import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";
import { UserUpdateApi, UserDeleteApi } from "@/api/Api"; // Uncommented imports
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
import { Checkbox } from "@/components/ui/checkbox";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  id: z.union([z.string(), z.number()]), // <-- add this line
  user_id: z
    .string()
    .min(1, { message: "Please enter a valid User ID." }),
  email: z
    .string()
    .min(1, { message: "Please enter an email." })
    .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: "Please enter a valid email address.",
    }),
  name: z.string().min(1, { message: "Please enter a name." }),
  type: z.enum(["View", "Edit", "Analysis", "Admin"], {
    message: "Please select a user type.",
  }),
  is_admin: z.boolean(),
  is_active: z.boolean(),
});


export default function ChangeUser() {
  const dispatch = useDispatch();
  const { UserProfileViewdata, UserProfileViewisLoading } = useSelector(
    (state) => state.Profiledata
  );
  const [showAlert, setShowAlert] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      user_id: "",
      email: "",
      name: "",
      type: "View",
      is_admin: false,
      is_active: false,
    },
  });

  useEffect(() => {
    if (UserProfileViewdata) {
      form.reset({
        id: UserProfileViewdata.id || "",
        user_id: UserProfileViewdata.user_id || "",
        email: UserProfileViewdata.email || "",
        name: UserProfileViewdata.name || "",
        type: UserProfileViewdata.type || "View",
        is_admin: UserProfileViewdata.is_admin || false,
        is_active: UserProfileViewdata.is_active || false,
      });
    }
  }, [UserProfileViewdata, form]);

  const handleCloseButtonClick = () => {
    dispatch(AdminCentralDataStatus("Userinfo"));
  };

  const handleDeleteButtonClick = async () => {
    try {
      await dispatch(UserDeleteApi({ user_id: form.getValues("user_id") })).unwrap();
      dispatch(AdminCentralDataStatus("Userinfo"));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const onSubmit = async (data) => {
    const mandatoryFields = ["id","user_id", "email", "name", "type"];
    const missingFields = mandatoryFields.filter((field) => !form.getValues()[field]);
    if (missingFields.length > 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    try {
      await dispatch(UserUpdateApi(data)).unwrap();
      dispatch(AdminCentralDataStatus("Userinfo"));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="bg-background  py-3 px-6">
      <h3 className="text-foreground font-bold text-2xl">Users</h3>
      <h6 className="text-muted-foreground mb-4">Change User</h6>
      <Card className="shadow-sm border-border">
        
        <CardContent className="p-2 max-h-[70vh] overflow-y-auto">
          {showAlert && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Missing Fields</AlertTitle>
              <AlertDescription>
                Please fill in all required fields.
              </AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormLabel>Password</FormLabel>
                <Link onClick={() => dispatch(AdminCentralDataStatus("ChangePass"))}>
                  <Button variant="outline" className="ml-2">
                    Change Password
                  </Button>
                </Link>
              </div>
              <div className="col-span-2 text-foreground font-medium mt-4">Personal Info</div>
              <FormField
                control={form.control}
                name="user_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter User ID" {...field} />
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
              <div className="col-span-2 text-foreground font-medium mt-4">Permissions</div>
              <FormField
                control={form.control}
                name="is_admin"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="m-0">Is Admin</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="m-0">Is Active</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField 
  control={form.control}
  name="type"
  render={({ field }) => (
    <FormItem className="whitespace-nowrap">
      <FormLabel>User Type</FormLabel>
      <Select value={field.value} onValueChange={field.onChange}>
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

              <div className="col-span-2 text-foreground font-medium mt-4">Available User Permissions</div>
              <Card className="col-span-2 border-border">
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">No permissions listed.</p>
                </CardContent>
              </Card>
              <div className="col-span-2 flex gap-2 justify-end mt-4">
                <Button type="submit">Save</Button>
                <Button variant="destructive" onClick={handleDeleteButtonClick}>
                  Delete
                </Button>
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