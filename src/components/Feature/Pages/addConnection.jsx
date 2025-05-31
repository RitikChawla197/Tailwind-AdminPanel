import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";
import { NewConnectionAddApi } from "@/api/Api";
import {
  Card,
  CardHeader,
  CardContent,
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
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const formSchema = z.object({
  ApplicationID: z.string().optional(),
  BPNO: z.number().optional(),
  Date: z.string().nonempty("Date is required"),
  DTGISID: z.string().nonempty("DTGISID is required"),
  PoleNo: z.number().optional(),
  ContractDemand: z.number().optional(),
  NearestConsumerNumber: z.string().nonempty("NearestConsumerNumber is required"),
  SanctionedLoad: z.number().optional(),
  SanctionedPhase: z.string().optional(),
  SanctionedCategory: z.string().optional(),
  ServiceCableLength: z.number().min(0, "ServiceCableLength must be a positive number"),
  Circle: z.string().optional(),
  Division: z.string().optional(),
  Subdivision: z.string().optional(),
  Section: z.string().optional(),
  SubstationID: z.string().optional(),
  SubstationName: z.string().optional(),
  Feederid: z.string().optional(),
  OperationType: z.string().optional(),
  Status: z.string().optional(),
  Feasibility: z.string().optional(),
  Before_Percentage_VR: z.string().optional(),
  After_Percentage_VR: z.string().optional(),
  Before_DTLoading: z.string().optional(),
  After_DTLoading: z.string().optional(),
  Recomnd_Phase: z.string().optional(),
  Remark: z.string().optional(),
});

export default function AddConnection() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ApplicationID: "",
      BPNO: 0,
      Date: "",
      DTGISID: "",
      PoleNo: 0,
      ContractDemand: 0,
      NearestConsumerNumber: "",
      SanctionedLoad: 0,
      SanctionedPhase: "",
      SanctionedCategory: "",
      ServiceCableLength: 0,
      Circle: "",
      Division: "",
      Subdivision: "",
      Section: "",
      SubstationID: "",
      SubstationName: "",
      Feederid: "",
      OperationType: "",
      Status: "PENDING",
      Feasibility: "NO",
      Before_Percentage_VR: "",
      After_Percentage_VR: "",
      Before_DTLoading: "",
      After_DTLoading: "",
      Recomnd_Phase: "",
      Remark: "",
    },
  });

  const handleDateChange = (date, field) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
    field.onChange(formattedDate);
    console.log("Formatted Date:", formattedDate);
  };

  const handleSelectFeasibility = (value) => {
    form.setValue("Feasibility", value);
  };

  const handleSelectStatus = (value) => {
    form.setValue("Status", value);
  };

  const mandatoryFields = ["Date", "DTGISID", "NearestConsumerNumber", "ServiceCableLength"];
  const missingFields = mandatoryFields.filter((field) => !form.getValues()[field]);

  const onSubmit = (data) => {
    if (missingFields.length > 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    console.log(data);
    dispatch(NewConnectionAddApi(data));
    dispatch(AdminCentralDataStatus("NewConnection"));
  };

  const handleCloseButtonClick = () => {
    dispatch(AdminCentralDataStatus("NewConnection"));
  };

  return (
    <div className="bg-background  py-3 px-6">
       <h3 className="text-foreground text-2xl font-bold">New Connection</h3>
       <h6 className="text-muted-foreground mb-4">Add Connection</h6>
      <Card className="shadow-sm border-border">
        
       <CardContent className="p-2 max-h-[80vh] overflow-y-auto">
          {showAlert && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Missing Fields</AlertTitle>
              <AlertDescription>
                Please fill in the following mandatory fields: {missingFields.join(", ")}
              </AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ApplicationID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Application ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="BPNO"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BPNO</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        placeholder="Enter BPNO"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? dayjs(field.value, "YYYY-MM-DD").format("MMMM D, YYYY") : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? dayjs(field.value, "YYYY-MM-DD").toDate() : undefined}
                          onSelect={(date) => handleDateChange(date, field)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="DTGISID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DTGISID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter DTGISID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="PoleNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pole No</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        placeholder="Enter Pole No"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ContractDemand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Demand</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        placeholder="Enter Contract Demand"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="NearestConsumerNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nearest Consumer Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Nearest Consumer Number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SanctionedLoad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sanctioned Load</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        placeholder="Enter Sanctioned Load"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SanctionedPhase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sanctioned Phase</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Sanctioned Phase" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SanctionedCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sanctioned Category</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Sanctioned Category" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ServiceCableLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Cable Length</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        placeholder="Enter Service Cable Length"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Circle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Circle</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Circle" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Division" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Subdivision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subdivision</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Subdivision" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Section" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SubstationID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Substation ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Substation ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SubstationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Substation Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Substation Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Feederid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feeder ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Feeder ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="OperationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operation Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Operation Type" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Feasibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feasibility</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            {field.value || "Select Feasibility"}
                            <span className="ml-2">▼</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuItem onClick={() => handleSelectFeasibility("YES")}>
                            YES
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSelectFeasibility("NO")}>
                            NO
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            {field.value || "Select Status"}
                            <span className="ml-2">▼</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuItem onClick={() => handleSelectStatus("PENDING")}>
                            PENDING
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSelectStatus("COMPLETED")}>
                            COMPLETED
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Before_Percentage_VR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Before Percentage VR</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Before Percentage VR" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="After_Percentage_VR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>After Percentage VR</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter After Percentage VR" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Before_DTLoading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Before DT Loading</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Before DT Loading" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="After_DTLoading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>After DT Loading</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter After DT Loading" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Recomnd_Phase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recommended Phase</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Recommended Phase" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Remark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remark</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Remark" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2 flex gap-2 mt-4">
                <Button type="submit" variant="default">
                  Save
                </Button>
                <Button variant="destructive">Delete</Button>
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
};