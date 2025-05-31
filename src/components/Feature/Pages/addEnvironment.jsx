import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AddEnvironmentApi, AllEnvironmentApi } from "@/api/Api";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";

export const AddEnvironment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const form = useForm({
    defaultValues: {
      SQL_NET_DATABASE: "",
      SQL_EQP_DATABASE: "",
      Server_Type: "",
      SQL_GIS_INSTANCES: "",
      SQL_GIS_USER: "",
      SQL_GIS_PASSWORD: "",
      SQL_GIS_DATABASE: "",
      SQl_PROJECT_NAME: "",
      SQL_PROJECT_PROJECTION: "",
      SQL_PROJECT_ZONE: "",
      SQL_PROJECT_LATITUDE: "",
      SQL_PROJECT_LONGITUTE: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setFeedback({ message: "", type: "" });
      // Convert empty strings to null for nullable fields
      const payload = {
        ...data,
        SQL_GIS_INSTANCES: data.SQL_GIS_INSTANCES || null,
        SQL_GIS_USER: data.SQL_GIS_USER || null,
        SQL_GIS_PASSWORD: data.SQL_GIS_PASSWORD || null,
        SQL_GIS_DATABASE: data.SQL_GIS_DATABASE || null,
      };
      console.log("Submitting payload:", payload);
      await dispatch(AddEnvironmentApi(payload)).unwrap();
      await dispatch(AllEnvironmentApi()); // Refresh environment list
      setFeedback({ message: "Environment added successfully.", type: "success" });
      setTimeout(() => {
         dispatch(AdminCentralDataStatus("Environment"));
      }, 2000); // Navigate back after 2 seconds
    } catch (error) {
      console.error("Error adding environment:", error);
      setFeedback({ message: "Failed to add environment.", type: "error" });
      setTimeout(() => setFeedback({ message: "", type: "" }), 2000);
    }
  };

  return (
    <div className="lg:max-w-6xl min-w-full p-4 md:max-w-4xl">
                  <h3 className="text-foreground text-2xl font-semibold">Add Environment</h3>
                  <h6 className="text-muted-foreground mb-4">Enter details for the new environment</h6>
       <Card className="shadow-sm border-border mx-auto">

         <CardContent className="p-3 max-h-[70vh] overflow-y-auto">
          {feedback.message && (
            <Alert
              variant={feedback.type === "success" ? "default" : "destructive"}
              className="mb-4"
            >
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Server_Type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Server Type" {...field} />
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
                      <Input placeholder="Enter SQL Net Database" {...field} />
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
                      <Input placeholder="Enter SQL EQP Database" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SQL_GIS_INSTANCES"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SQL GIS Instances (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SQL GIS Instances" {...field} />
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
                    <FormLabel>SQL GIS User (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SQL GIS User" {...field} />
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
                    <FormLabel>SQL GIS Password (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SQL GIS Password" {...field} />
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
                    <FormLabel>SQL GIS Database (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SQL GIS Database" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SQl_PROJECT_NAME"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SQL Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SQL Project Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SQL_PROJECT_PROJECTION"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SQL Project Projection</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SQL Project Projection" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SQL_PROJECT_ZONE"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SQL Project Zone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SQL Project Zone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SQL_PROJECT_LATITUDE"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SQL Project Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SQL Project Latitude" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SQL_PROJECT_LONGITUTE"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SQL Project Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SQL Project Longitude" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex justify-end gap-2">
                <Button type="submit">Save</Button>
                <Button variant="outline"  onClick={() => dispatch(AdminCentralDataStatus("Environment"))}>
                  Cancel
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};