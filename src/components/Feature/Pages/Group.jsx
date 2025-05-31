/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  GroupUserProfileViewApi,
  AllGroupViewApi,
  AllGroupPermissionViewApi,
} from "@/api/Api";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";
import ChangeGr from "./ChangeGr";
import { Fingerprint, UsersRound } from "lucide-react";

export default function Group() {
  const dispatch = useDispatch();
  const [visibleItem, setVisibleItem] = useState("Dashboard");
  const [searchInput, setSearchInput] = useState("");
  const [searchResultsFound, setSearchResultsFound] = useState(true);


    useEffect(() => {
          dispatch(AllGroupPermissionViewApi());
        }, [dispatch]);

  const { AllGroupPermissionViewdata } = useSelector(
    (state) => state.AllGroupPermissionView
  );



  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleUserIdClick = (user_id) => {
    dispatch(AdminCentralDataStatus("ChangeGr"));
    dispatch(GroupUserProfileViewApi({ user_id }));
    dispatch(AllGroupViewApi());
    console.log({ user_id });
  };

  const userData = AllGroupPermissionViewdata;
  const filteredUsers =
    userData?.msg?.filter(
      (user) =>
        String(user.UserId).includes(searchInput) ||
        user.user_id?.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.NetworkList?.some((network) =>
          String(network).includes(searchInput)
        )
    ) || [];

  return (
    <div className="bg-background  py-3 px-6">
          <h3 className="text-2xl font-bold text-foreground">Permissions</h3>
          <h6 className="text-muted-foreground mb-4">Group Permissions</h6>
          <Card className="shadow-sm border-border">
        <CardHeader>
          <div className="flex items-center ">
            <Input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full"
            />
            <Button variant="outline">Search</Button>
          </div>
        </CardHeader>
        <CardContent className="p-2 overflow-y-auto">
            <div className="max-h-[60vh] overflow-y-auto">
          <Table >
            <TableHeader className="sticky top-0 bg-muted z-10">
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Network List</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>
                    <Button
                      onClick={() => handleUserIdClick(user.user_id)}
                      className=" hover:text-red-600"
                    >
                  <UsersRound size={20} strokeWidth={1.75} />
                    </Button>
                  </TableCell>
                  {visibleItem === "ChangeGr" && <ChangeGr />}
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="whitespace-pre-wrap break-words max-w-[300px]">{user.NetworkList.join(", ")}</TableCell>
                </TableRow>
              ))}
             
            </TableBody>
            
          </Table>
</div>
          {filteredUsers?.length === 0 && searchResultsFound && (
            <Alert
              variant="default"
              className="mt-4"
              onClose={() => setSearchResultsFound(false)}
            >
              <AlertTitle>No Results Found</AlertTitle>
              <AlertDescription>
                We couldn’t find any users matching your search.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="justify-end text-sm text-muted-foreground border-t">
    Total Users: <span className="font-semibold ml-2">{filteredUsers?.length}</span>
  </CardFooter>
      </Card>
    </div>
  );
}
