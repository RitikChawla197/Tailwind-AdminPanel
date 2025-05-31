/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AllUserApi, UserProfileView } from "@/api/Api";
import { UserRoundPen } from "lucide-react";

export const Users = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [visibleItem, setVisibleItem] = useState("Dashboard");
  const handleAddUserClick = () => {
    setShowAddUser(true);
  };
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(AllUserApi());
    }, [dispatch]);


  const { AllUserdata, AllUserisLoading } = useSelector(
    (state) => state.AllUserData
  );

  const handleUserIdClick = (user_id) => {
    dispatch(AdminCentralDataStatus("ChangeUser"));
    const data = { user_id };
    console.log(data);
    dispatch(UserProfileView(data));
  };

  const [showPassword, setShowPassword] = useState(false);
  const userData = AllUserdata;

  console.log(userData)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredUsers = Array.isArray(userData)
    ? userData.filter(
        (user) =>
          user?.user_id?.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.type.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  const [searchResultsFound, setSearchResultsFound] = useState(true);

  return (
    <div className="bg-background  py-3 px-6">
       <div className="flex flex-row items-center justify-between">
            <div>
              <h1 className="text-foreground font-bold text-2xl">Users</h1>
              <h6 className="text-muted-foreground mb-4">Select user to change</h6>
            </div>
            <Link
              onClick={() => dispatch(AdminCentralDataStatus("CreateUser"))}
            >
              <Button variant="default">Add User +</Button>
            </Link>
          </div>
      <Card className="shadow-sm border-border">
       
         <CardContent className="p-2 overflow-y-auto">
          <div className="mb-4 flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              className="bg-muted"
            />
            <Button variant="outline">Search</Button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto">
            <Table className="w-full border border-border">
              <TableCaption className="text-muted-foreground">
                A list of users.
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-muted/50">
                 
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                    Email
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                    Name
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                    Is Admin
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                    User ID
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.user_id} className="hover:bg-muted/20">
                   
                    <TableCell className="text-center text-foreground">
                      {user.email || "N/A"}
                    </TableCell>
                    <TableCell className="text-center text-foreground">
                      {user.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-center text-foreground">
                      {user.type === "Admin" ? (
                        <span className="text-success">✓</span>
                      ) : user.type !== "Admin" ? (
                        <span className="text-destructive">✗</span>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="text-center text-foreground">
                      {user.user_id || "N/A"}
                    </TableCell>
                    <TableCell className="text-center text-foreground">
                      <a
                        href="#"
                        onClick={() => handleUserIdClick(user.user_id)}
                        className="text-primary hover:underline"
                      >
                         <Button>
                         <UserRoundPen size={20}/>
    </Button>
                      </a>
                      {/* {user.id || "N/A"} */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredUsers.length === 0 && searchResultsFound && (
            <Alert variant="info" className="mt-4">
              <AlertTitle>No Results</AlertTitle>
              <AlertDescription>
                No search results found.
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => setSearchResultsFound(false)}
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      {visibleItem === "CreateUser" && <AddUser />}
      {visibleItem === "ChangeUser" && <ChangeUser />}
    </div>
  );
};

export default Users;