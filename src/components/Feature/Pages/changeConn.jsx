import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";
import { NewConnectionUpdateUserApi, DeleteNewConnectionApi } from "@/api/Api";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Add these imports
import { Calendar } from "@/components/ui/calendar"; // Add this import
import { CalendarIcon } from "@radix-ui/react-icons"; // Add this import
import dayjs from "dayjs"; // Ensure dayjs is imported
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function ChangeConn() {
  const { AllNSCViewdata, AllNSCViewisLoading } = useSelector(
    (state) => state.AllNewConnectionViewData
  );
  const { UpdateConnectiondata, UpdateConnectionisLoading } = useSelector(
    (state) => state.UpdateConnection
  );

  const ConnectionData = UpdateConnectiondata;

  const [Delete, setDelete] = useState({
    NearestConsumerNumber: ConnectionData
      ? ConnectionData?.output[0].NearestConsumerNumber
      : "",
  });

  useEffect(() => {
    setDelete({
      NearestConsumerNumber: ConnectionData
        ? ConnectionData?.output[0].NearestConsumerNumber
        : "",
    });
  }, [ConnectionData]);

  const dispatch = useDispatch();

  const [NewConnData, setNewConnData] = useState({
    ApplicationID: ConnectionData ? ConnectionData?.output[0].ApplicationID : "",
    BPNO: ConnectionData ? ConnectionData?.output[0].BPNO : "",
    Date: ConnectionData ? ConnectionData?.output[0].Date : "",
    DTGISID: ConnectionData ? ConnectionData?.output[0].DTGISID : "",
    PoleNo: ConnectionData ? ConnectionData?.output[0].PoleNo : "",
    ContractDemand: ConnectionData ? ConnectionData?.output[0].ContractDemand : "",
    NearestConsumerNumber: ConnectionData
      ? ConnectionData?.output[0].NearestConsumerNumber
      : "",
    SanctionedLoad: ConnectionData ? ConnectionData?.output[0].SanctionedLoad : "",
    SanctionedPhase: ConnectionData ? ConnectionData?.output[0].SanctionedPhase : "",
    SanctionedCategory: ConnectionData
      ? ConnectionData?.output[0].SanctionedCategory
      : "",
    ServiceCableLength: ConnectionData
      ? ConnectionData?.output[0].ServiceCableLength
      : "",
    Circle: ConnectionData ? ConnectionData?.output[0].Circle : "",
    Division: ConnectionData ? ConnectionData?.output[0].Division : "",
    Subdivision: ConnectionData ? ConnectionData?.output[0].Subdivision : "",
    Section: ConnectionData ? ConnectionData?.output[0].Section : "",
    SubstationID: ConnectionData ? ConnectionData?.output[0].SubstationID : "",
    SubstationName: ConnectionData ? ConnectionData?.output[0].SubstationName : "",
    Feederid: ConnectionData ? ConnectionData?.output[0].Feederid : "",
    OperationType: ConnectionData ? ConnectionData?.output[0].OperationType : "",
    Status: ConnectionData ? ConnectionData?.output[0].Status : "",
    Feasibility: ConnectionData ? ConnectionData?.output[0].Feasibility : "",
    Before_Percentage_VR: ConnectionData
      ? ConnectionData?.output[0].Before_Percentage_VR
      : "",
    After_Percentage_VR: ConnectionData
      ? ConnectionData?.output[0].After_Percentage_VR
      : "",
    Before_DTLoading: ConnectionData
      ? ConnectionData?.output[0].Before_DTLoading
      : "",
    After_DTLoading: ConnectionData
      ? ConnectionData?.output[0].After_DTLoading
      : "",
    Recomnd_Phase: ConnectionData ? ConnectionData?.output[0].Recomnd_Phase : "",
    Remark: ConnectionData ? ConnectionData?.output[0].Remark : "",
  });

  useEffect(() => {
    if (ConnectionData) {
      setNewConnData(ConnectionData?.output[0]);
    }
  }, [ConnectionData]);

  const handleDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
    setNewConnData((prevData) => ({
      ...prevData,
      Date: formattedDate,
    }));
    console.log("Formatted Date:", formattedDate);
  };

  const handleSelect = (eventKey) => {
    setNewConnData((prevData) => ({
      ...prevData,
      Feasibility: eventKey,
    }));
  };

  const handleSelect1 = (eventKey) => {
    setNewConnData((prevData) => ({
      ...prevData,
      Status: eventKey,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue;

    if (name === "Date") {
      newValue = value;
    } else if (
      ["ApplicationID", "PoleNo", "ContractDemand", "BPNO"].includes(name)
    ) {
      newValue = parseFloat(value) || 0;
    } else if (
      [
        "NearestConsumerNumber",
        "DTGISID",
        "Feederid",
        "Recomnd_Phase",
        "Remark",
      ].includes(name)
    ) {
      newValue = value;
    } else if (["SanctionedLoad", "ServiceCableLength"].includes(name)) {
      newValue = parseFloat(value) || 0;
    } else if (["Status", "Feasibility"].includes(name)) {
      newValue = value;
    } else {
      newValue = value;
    }

    setNewConnData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSaveButtonClick = async (e) => {
    e.preventDefault();
    console.log(NewConnData);
    dispatch(NewConnectionUpdateUserApi(NewConnData));
    dispatch(AdminCentralDataStatus("NewConnection"));
  };

  const handleDeleteButtonClick = async (e) => {
    e.preventDefault();
    console.log(Delete);
    dispatch(DeleteNewConnectionApi(Delete));
    dispatch(AdminCentralDataStatus("NewConnection"));
  };

  const handleCloseButtonClick = () => {
    dispatch(AdminCentralDataStatus("NewConnection"));
  };

  return (
    <div className="bg-background  py-3 px-6">
       <h3  className="text-foreground text-2xl font-bold mb-4">
            Change Connection
          </h3>
      <Card className="shadow-sm border-border">
          
        <CardContent className="p-2 max-h-[80vh] overflow-y-auto">
          <div className="row">
            <div className="col-xl-9">
              <div style={{ margin: "10px 0" }}></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">ApplicationID:</label>
                  <Input
                    placeholder=""
                    name="ApplicationID"
                    value={NewConnData.ApplicationID}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">BPNO:</label>
                  <Input
                    placeholder=""
                    name="BPNO"
                    value={NewConnData.BPNO}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Date:</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {NewConnData.Date
                          ? dayjs(NewConnData.Date).format("MMMM D, YYYY")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={NewConnData.Date ? dayjs(NewConnData.Date).toDate() : undefined}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-sm font-medium">DTGISID:</label>
                  <Input
                    placeholder=""
                    name="DTGISID"
                    value={NewConnData.DTGISID}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">PoleNo:</label>
                  <Input
                    placeholder=""
                    name="PoleNo"
                    value={NewConnData.PoleNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">ContractDemand:</label>
                  <Input
                    placeholder=""
                    name="ContractDemand"
                    value={NewConnData.ContractDemand}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">NearestConsumerNumber:</label>
                  <Input
                    placeholder=""
                    name="NearestConsumerNumber"
                    value={NewConnData.NearestConsumerNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">SanctionedLoad:</label>
                  <Input
                    placeholder=""
                    name="SanctionedLoad"
                    value={NewConnData.SanctionedLoad}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">SanctionedPhase:</label>
                  <Input
                    placeholder=""
                    name="SanctionedPhase"
                    value={NewConnData.SanctionedPhase}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">SanctionedCategory:</label>
                  <Input
                    placeholder=""
                    name="SanctionedCategory"
                    value={NewConnData.SanctionedCategory}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">ServiceCableLength:</label>
                  <Input
                    placeholder=""
                    name="ServiceCableLength"
                    value={NewConnData.ServiceCableLength}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Circle:</label>
                  <Input
                    placeholder=""
                    name="Circle"
                    value={NewConnData.Circle}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Division:</label>
                  <Input
                    placeholder=""
                    name="Division"
                    value={NewConnData.Division}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Subdivision:</label>
                  <Input
                    placeholder=""
                    name="Subdivision"
                    value={NewConnData.Subdivision}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Section:</label>
                  <Input
                    placeholder=""
                    name="Section"
                    value={NewConnData.Section}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">SubstationID:</label>
                  <Input
                    placeholder=""
                    name="SubstationID"
                    value={NewConnData.SubstationID}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">SubstationName:</label>
                  <Input
                    placeholder=""
                    name="SubstationName"
                    value={NewConnData.SubstationName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Feederid:</label>
                  <Input
                    placeholder=""
                    name="Feederid"
                    value={NewConnData.Feederid}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">OperationType:</label>
                  <Input
                    placeholder=""
                    name="OperationType"
                    value={NewConnData.OperationType}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Feasibility:</label>
                  <Select
                    onValueChange={handleSelect}
                    value={NewConnData.Feasibility}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Feasibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Status:</label>
                  <Select
                    onValueChange={handleSelect1}
                    value={NewConnData.Status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Before Percentage VR:</label>
                  <Input
                    placeholder=""
                    name="Before_Percentage_VR"
                    value={NewConnData.Before_Percentage_VR}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">After Percentage VR:</label>
                  <Input
                    placeholder=""
                    name="After_Percentage_VR"
                    value={NewConnData.After_Percentage_VR}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Before DTLoading:</label>
                  <Input
                    placeholder=""
                    name="Before_DTLoading"
                    value={NewConnData.Before_DTLoading}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">After DTLoading:</label>
                  <Input
                    placeholder=""
                    name="After_DTLoading"
                    value={NewConnData.After_DTLoading}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Recomnd Phase:</label>
                  <Input
                    placeholder=""
                    name="Recomnd_Phase"
                    value={NewConnData.Recomnd_Phase}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Remark:</label>
                  <Input
                    placeholder=""
                    name="Remark"
                    value={NewConnData.Remark}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2 flex gap-2 mt-4">
                  <Button
                    type="submit"
                    variant="default"
                    onClick={handleSaveButtonClick}
                  >
                    Save
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteButtonClick}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCloseButtonClick}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}