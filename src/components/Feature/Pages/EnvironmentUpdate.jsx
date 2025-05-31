import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EnvironmentUpdateApi } from "@/api/Api";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";

const EnvironmentUpdateForm = () => {
  const dispatch = useDispatch();
  const { AllEnvironmentsdata } = useSelector(
    (state) => state.AllEnvironmentsData
  );
  const EnvStatus = useSelector((state) => state.context);
  console.log("EnvStatus", EnvStatus);

  const form = useForm({
    defaultValues: {
      SQL_ADMIN_INSTANCES: "",
      SQL_ADMIN_DATABASE: "",
      SQL_ADMIN_USER: "",
      SQL_ADMIN_PASS: "",
      SQL_NET_INSTANCES: "",
      SQL_NET_DATABASE: "",
      SQL_NET_USER: "",
      SQL_NET_PASS: "",
      SQL_EQP_INSTANCES: "",
      SQL_EQP_DATABASE: "",
      SQL_EQP_USER: "",
      SQL_EQP_PASS: "",
      SQL_GIS_INSTANCES: "",
      SQL_GIS_USER: "",
      SQL_GIS_PASSWORD: "",
      SQL_GIS_DATABASE: "",
      Server_Type: "",
      is_active: false,
    },
  });

  const [showPasswords, setShowPasswords] = useState({
    SQL_ADMIN_PASS: false,
    SQL_NET_PASS: false,
    SQL_EQP_PASS: false,
    SQL_GIS_PASSWORD: false,
  });

  useEffect(() => {
    if (AllEnvironmentsdata?.output) {
      const selectedEnv = AllEnvironmentsdata.output.find(
        (e) => e.Server_Type === EnvStatus?.AdminEnvironmentStatus
      );
      if (selectedEnv) {
        form.reset({
          SQL_ADMIN_INSTANCES: selectedEnv.SQL_ADMIN_INSTANCES || "",
          SQL_ADMIN_DATABASE: selectedEnv.SQL_ADMIN_DATABASE || "",
          SQL_ADMIN_USER: selectedEnv.SQL_ADMIN_USER || "",
          SQL_ADMIN_PASS: selectedEnv.SQL_ADMIN_PASS || "",
          SQL_NET_INSTANCES: selectedEnv.SQL_NET_INSTANCES || "",
          SQL_NET_DATABASE: selectedEnv.SQL_NET_DATABASE || "",
          SQL_NET_USER: selectedEnv.SQL_NET_USER || "",
          SQL_NET_PASS: selectedEnv.SQL_NET_PASS || "",
          SQL_EQP_INSTANCES: selectedEnv.SQL_EQP_INSTANCES || "",
          SQL_EQP_DATABASE: selectedEnv.SQL_EQP_DATABASE || "",
          SQL_EQP_USER: selectedEnv.SQL_EQP_USER || "",
          SQL_EQP_PASS: selectedEnv.SQL_EQP_PASS || "",
          SQL_GIS_INSTANCES: selectedEnv.SQL_GIS_INSTANCES || "",
          SQL_GIS_USER: selectedEnv.SQL_GIS_USER || "",
          SQL_GIS_PASSWORD: selectedEnv.SQL_GIS_PASSWORD || "",
          SQL_GIS_DATABASE: selectedEnv.SQL_GIS_DATABASE || "",
          Server_Type: selectedEnv.Server_Type || "",
          is_active: selectedEnv.is_active || false,
        });
      }
    }
  }, [AllEnvironmentsdata, EnvStatus, form]);

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data) => {
    try {
      console.log("Submitting form with data:", data);
      await dispatch(EnvironmentUpdateApi(data)).unwrap();
      dispatch(AdminCentralDataStatus("Environment"));
      console.log("Form submission successful");
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <div className="bg-background  py-0 px-6">
      <h3 className="text-foreground text-2xl font-bold">
            Environments Update
          </h3>
          <h6 className="text-muted-foreground mb-4">
            {form.watch("Server_Type") || "N/A"}
          </h6>
      <Card className="shadow-sm border-border">
        
      <CardContent className="p-2 overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <Accordion type="single" collapsible className="space-y-1">
                <AccordionItem value="admin" className="border-b">
                  <AccordionTrigger className="py-1 text-sm font-medium">
                    SQL Admin Settings
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-1">
                    <FormField
                      control={form.control}
                      name="SQL_ADMIN_INSTANCES"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL Admin Instances</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL Admin Instances"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_ADMIN_DATABASE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL Admin Database</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL Admin Database"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_ADMIN_USER"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL Admin User</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL Admin User"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_ADMIN_PASS"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL Admin Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={
                                  showPasswords.SQL_ADMIN_PASS
                                    ? "text"
                                    : "password"
                                }
                                placeholder="Enter SQL Admin Password"
                                {...field}
                              />
                              <Button
                                type="button" // Prevent form submission
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() =>
                                  togglePasswordVisibility("SQL_ADMIN_PASS")
                                }
                              >
                                {showPasswords.SQL_ADMIN_PASS ? (
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
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="net" className="border-b">
                  <AccordionTrigger className="py-1 text-sm font-medium">
                    SQL Net Settings
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-1">
                    <FormField
                      control={form.control}
                      name="SQL_NET_INSTANCES"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL Net Instances</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL Net Instances"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_NET_DATABASE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL Net Database</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL Net Database"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_NET_USER"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL Net User</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL Net User"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_NET_PASS"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL Net Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={
                                  showPasswords.SQL_NET_PASS
                                    ? "text"
                                    : "password"
                                }
                                placeholder="Enter SQL Net Password"
                                {...field}
                              />
                              <Button
                                type="button" // Prevent form submission
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() =>
                                  togglePasswordVisibility("SQL_NET_PASS")
                                }
                              >
                                {showPasswords.SQL_NET_PASS ? (
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
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="eqp" className="border-b">
                  <AccordionTrigger className="py-1 text-sm font-medium">
                    SQL EQP Settings
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-1">
                    <FormField
                      control={form.control}
                      name="SQL_EQP_INSTANCES"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL EQP Instances</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL EQP Instances"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_EQP_DATABASE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL EQP Database</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL EQP Database"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_EQP_USER"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL EQP User</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL EQP User"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_EQP_PASS"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL EQP Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={
                                  showPasswords.SQL_EQP_PASS
                                    ? "text"
                                    : "password"
                                }
                                placeholder="Enter SQL EQP Password"
                                {...field}
                              />
                              <Button
                                type="button" // Prevent form submission
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() =>
                                  togglePasswordVisibility("SQL_EQP_PASS")
                                }
                              >
                                {showPasswords.SQL_EQP_PASS ? (
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
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="gis" className="border-b">
                  <AccordionTrigger className="py-1 text-sm font-medium">
                    SQL GIS Settings
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-1">
                    <FormField
                      control={form.control}
                      name="SQL_GIS_INSTANCES"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL GIS Instances</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL GIS Instances"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_GIS_USER"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL GIS User</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL GIS User"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="SQL_GIS_PASSWORD"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL GIS Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={
                                  showPasswords.SQL_GIS_PASSWORD
                                    ? "text"
                                    : "password"
                                }
                                placeholder="Enter SQL GIS Password"
                                {...field}
                              />
                              <Button
                                type="button" // Prevent form submission
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() =>
                                  togglePasswordVisibility("SQL_GIS_PASSWORD")
                                }
                              >
                                {showPasswords.SQL_GIS_PASSWORD ? (
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
                    <FormField
                      control={form.control}
                      name="SQL_GIS_DATABASE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SQL GIS Database</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SQL GIS Database"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <FormField
                control={form.control}
                name="Server_Type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select server type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Propose">Propose</SelectItem>
                        <SelectItem value="Production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
              <div className="flex gap-2 justify-end">
                <Button type="submit">Save</Button>
                {/* <Button variant="destructive">Delete</Button> */}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentUpdateForm;