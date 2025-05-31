/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";
import { saveNetworkListApi } from "@/api/Api";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert"; // For feedback

export default function ChangeGr() {
  const [switchStates, setSwitchStates] = useState({});
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" }); // Success/error feedback

  const dispatch = useDispatch();
  const { GroupAlldata } = useSelector((state) => state.GroupView);
  const { GroupUserProfileViewdata } = useSelector(
    (state) => state.GroupUserPermissionView
  );

  const GroupData = GroupAlldata || { Group: [], data: [] };
  const groupArray = GroupData.Group || [];

  const filteredData = GroupData?.data.filter(
    (e) =>
      e.NetworkId.toLowerCase().includes(searchInput.toLowerCase()) ||
      e.GroupType.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Initialize switch states and list based on GroupUserProfileViewdata
  useEffect(() => {
    if (GroupUserProfileViewdata?.networkid) {
      const initialStates = {};
      const initialList = [];
      GroupUserProfileViewdata.networkid.forEach((id) => {
        initialStates[`NetworkId_${id}`] = true;
        initialList.push(id);
      });
      setSwitchStates(initialStates);
      setList(initialList);
    } else {
      // Reset if no networkid data
      setSwitchStates({});
      setList([]);
    }
  }, [GroupUserProfileViewdata]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSwitchChange = (id) => {
    const switchId = `NetworkId_${id}`;
    setList((prevList) =>
      prevList.includes(id)
        ? prevList.filter((prevId) => prevId !== id)
        : [...prevList, id]
    );
    setSwitchStates((prev) => ({
      ...prev,
      [switchId]: !prev[switchId],
    }));
  };

  const handleSaveClick = async () => {
    try {
      setFeedback({ message: "", type: "" });
      const data = {
        user_id: GroupUserProfileViewdata?.user_id || "",
        NetworkList: list,
      };
      console.log("Saving data:", data);
      await dispatch(saveNetworkListApi(data)).unwrap();
      dispatch(AdminCentralDataStatus("GroupPermissions"));
      setFeedback({ message: "Permissions saved successfully.", type: "success" });
      setTimeout(() => setFeedback({ message: "", type: "" }), 2000); // Clear feedback after 2 seconds
    } catch (error) {
      console.error("Error saving permissions:", error);
      setFeedback({ message: "Failed to save permissions.", type: "error" });
      setTimeout(() => setFeedback({ message: "", type: "" }), 2000);
    }
  };

  return (
    <div className="bg-background  py-3 px-6">
<div className="flex flex-row items-center justify-between">
       <div>
       <h3 className="text-2xl font-bold text-foreground">Permissions</h3>
            <p className="text-muted-foreground">Change Permissions</p>
            <p className="text-[16px] text-gray-700 mb-4">
              {GroupUserProfileViewdata?.email || ""}
            </p>
          </div>
            <Button onClick={handleSaveClick}>Save</Button>
            </div>
    <Card className="shadow-sm border-border">

        {feedback.message && (
          <div className="px-6">
            <Alert
              variant={feedback.type === "success" ? "default" : "destructive"}
              className="mb-4"
            >
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="flex items-center gap-2 px-2">
          <Input
            type="text"
            placeholder="Search by Network ID or Group Type"
            value={searchInput}
            onChange={handleSearchChange}
            className="bg-white w-1/3"
          />
        </div>

        <CardContent className="p-2 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupArray.map((group, index) => (
              <Card key={index} className="p-3">
                <h4 className="text-center font-semibold mb-2">
                  {group.GroupType}
                </h4>
                <div className="space-y-2 overflow-y-auto max-h-[30vh] px-2">
                  {filteredData
                    .filter((e) => e.GroupType === group.GroupType)
                    .map((e) => {
                      const switchId = `NetworkId_${e.id}`;
                      return (
                        <div
                          key={e.id}
                          className="flex justify-between items-center py-1 border-b"
                        >
                          <Label className="text-sm">{e.NetworkId}</Label>
                          <Switch
                            checked={switchStates[switchId] || false}
                            onCheckedChange={() => handleSwitchChange(e.id)}
                          />
                        </div>
                      );
                    })}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>

        <CardFooter className="text-right text-muted-foreground text-sm">
          Total Feeders: {filteredData.length}
        </CardFooter>
      </Card>
    </div>
  );
}