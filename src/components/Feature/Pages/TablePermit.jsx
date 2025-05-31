import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";
import { TableUserProfileViewApi, AuthPermissionsViewApi, AllTablePermissionViewApi } from "@/api/Api";
import UpdateTable from "./UpdateTable";
import { Pencil } from "lucide-react";

export default function TablePermit() {
  const [searchInput, setSearchInput] = useState("");
  const [showAlert, setShowAlert] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllTablePermissionViewApi());
  },[dispatch]);
  const { AllTablePermissionViewdata } = useSelector((state) => state.AllTablePermission);

  const handleUserIdClick = (user_id) => {
    dispatch(AdminCentralDataStatus("UpdateTable"));
    dispatch(TableUserProfileViewApi({ user_id }));
    dispatch(AuthPermissionsViewApi());
  };

  const filteredUsers = AllTablePermissionViewdata
    ? AllTablePermissionViewdata.filter((user) =>
        String(user.user_id).includes(searchInput) ||
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        String(user.user_id).toLowerCase().includes(searchInput.toLowerCase()) ||
        user.Permission.some((perm) => String(perm).toLowerCase().includes(searchInput.toLowerCase()))
      )
    : [];

  return (
    <div className="bg-background  py-3 px-6">
       <h3 className="text-2xl font-bold text-foreground">Permissions</h3>
       <h6 className="text-muted-foreground mb-4">Table Permissions</h6>
         <Card className="shadow-sm border-border">
      

        <div className="flex items-center gap-2 px-4">
          <Input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full"
          />
          <Button variant="outline">Search</Button>
        </div>

        <CardContent className="p-2 max-h-[65vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Permissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell>
                    <Button
  onClick={() => handleUserIdClick(user.user_id)}
  variant="ghost"
  className="text-primary hover:text-blue-600 hover:bg-blue-100 transition-colors p-2 rounded-full"
>
  <Pencil size={20} strokeWidth={1} />
</Button>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.Permission.join(", ")}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
              {filteredUsers.length > 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="font-bold">Total Users:</TableCell>
                  <TableCell>{filteredUsers.length}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && showAlert && (
            <Alert variant="default" className="mt-4" onOpenChange={() => setShowAlert(false)}>
              <AlertTitle>No search results found.</AlertTitle>
              <AlertDescription>Try modifying your search term.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

     
    </div>
  );
}
