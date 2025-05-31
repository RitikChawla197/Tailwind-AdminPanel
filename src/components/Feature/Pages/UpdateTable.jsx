/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";
import { AuthPermissionsViewApi, saveAuthPermissionsApi } from "@/api/Api";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function UpdateTable() {
  const [searchInput, setSearchInput] = useState("");
  const [newSelections, setNewSelections] = useState([]);
  const [searchResultsFound, setSearchResultsFound] = useState(true);
  const [checkedOptions, setCheckedOptions] = useState({});

  const dispatch = useDispatch();

  const { UserTablePermissionViewdata } = useSelector(
    (state) => state.UserTableProfileView
  );
  const { AuthPermissionsdata } = useSelector((state) => state.AuthPermissions);

  const authPermissionsArray = AuthPermissionsdata?.output || [];

  useEffect(() => {
    if (UserTablePermissionViewdata) {
      const permissionsArray = UserTablePermissionViewdata.Permission || [];
      const initialCheckedOptions = authPermissionsArray.reduce((acc, authPermission) => {
        acc[authPermission.codename] = permissionsArray.includes(
          authPermission.codename
        );
        return acc;
      }, {});
      setCheckedOptions(initialCheckedOptions);
    }
  }, [UserTablePermissionViewdata, authPermissionsArray]);

  const filteredData = authPermissionsArray.filter((e) =>
    e.codename.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    setSearchResultsFound(filteredData.length > 0);
  }, [filteredData]);

  const handleSwitchChange = (permission) => {
    setCheckedOptions((prev) => {
      const updated = {
        ...prev,
        [permission.codename]: !prev[permission.codename],
      };
      if (!prev[permission.codename]) {
        setNewSelections((prev) => [...prev, permission.codename]);
      }
      return updated;
    });
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSaveClick = () => {
    const selectedPermissions = Object.keys(checkedOptions).filter(
      (key) => checkedOptions[key]
    );

    const data = {
      UserId: UserTablePermissionViewdata.id,
      permissions: selectedPermissions,
    };

    dispatch(saveAuthPermissionsApi(data));
    dispatch(AdminCentralDataStatus("TablePermit"));
  };

  return (
    <div className="bg-background  py-3 px-6">
        <div className="flex justify-between items-center">
          <div>
            <h3  className="text-2xl font-bold text-foreground">Permissions</h3>
            <h6 className="text-muted-foreground">Change Permissions</h6>
            <h5 className="text-sm font-medium mb-4">
              {UserTablePermissionViewdata?.email || ""}
            </h5>
          </div>
          <Button onClick={handleSaveClick}>
            Save
          </Button>
        </div>
       <Card className="shadow-sm border-border">
      
        <div className="px-4">
          <Input
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
          
          />
        </div>
        <CardContent className="p-2 max-h-[65vh] overflow-y-auto">
          {filteredData.length > 0 ? (
            filteredData.map((authPermission) => (
              <div
                key={authPermission.codename}
                className="flex items-center justify-between py-1 px-2 hover:bg-accent rounded"
              >
                <Label htmlFor={authPermission.codename} className="text-sm">
                  {authPermission.codename}
                </Label>
                <Switch
                  id={authPermission.codename}
                  checked={checkedOptions[authPermission.codename] || false}
                  onCheckedChange={() => handleSwitchChange(authPermission)}
                />
              </div>
            ))
          ) : (
            searchResultsFound && (
              <Alert variant="info" className="mt-2">
                No search results found.
              </Alert>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
