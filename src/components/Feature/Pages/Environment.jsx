import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AdminCentralDataStatus, AdminEnvironmentDataStatus } from "@/store/slices/contextslice";
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
import { AllEnvironmentApi } from "@/api/Api";

export const Environment = () => {
  const dispatch = useDispatch();
  const { AllEnvironmentsdata, AllEnvironmentsisLoading } = useSelector(
    (state) => state.AllEnvironmentsData
  );

 useEffect(() => {
    dispatch(AllEnvironmentApi());
  }, [dispatch]);


  const handleUserIdClick = (user) => {
    dispatch(AdminCentralDataStatus("ChangeEnv"));
    dispatch(AdminEnvironmentDataStatus(user));
  };

  const userData = AllEnvironmentsdata?.output || [];

  const [serverSearchInput, setServerSearchInput] = useState("");
  const [searchResultsFound, setSearchResultsFound] = useState(true);

  const handleServerSearchChange = (e) => {
    setServerSearchInput(e.target.value);
    setSearchResultsFound(true);
  };

  const filteredServers = userData.filter(
    (user) =>
      user.Server_Type?.toLowerCase().includes(serverSearchInput.toLowerCase()) ||
      user.SQL_ADMIN_INSTANCES?.toLowerCase().includes(serverSearchInput.toLowerCase()) ||
      user.SQL_NET_DATABASE?.toLowerCase().includes(serverSearchInput.toLowerCase()) ||
      user.SQL_EQP_DATABASE?.toLowerCase().includes(serverSearchInput.toLowerCase())
  );

  return (
    <div className="bg-background  py-3 px-6">
      
       <div className="flex flex-row items-center justify-between">
                  <div>
                  <h3 className="text-foreground text-2xl font-bold">Environment</h3>
       <h6 className="text-muted-foreground mb-4">Select environments to change</h6>
       </div>
                  <Link
                    onClick={() => dispatch(AdminCentralDataStatus("AddEnvironment"))}
                  >
                    <Button variant="default">Add Environment +</Button>
                  </Link>
                </div>
      <Card className="shadow-sm border-border">
       
      <CardContent className="p-2 overflow-y-auto">
          <div className="mb-4 flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search"
              value={serverSearchInput}
              onChange={handleServerSearchChange}
              className="bg-muted"
            />
            <Button variant="outline">Search</Button>
          </div>
          <div className=" overflow-y-auto">
                <Table className="w-full border border-border">
                  <TableCaption className="text-muted-foreground">
                    A list of environments.
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                        Environments
                      </TableHead>
                      <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                        SERVER
                      </TableHead>
                      <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                        SQL SERVER DATABASE NET
                      </TableHead>
                      <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                        SQL SERVER DATABASE EQP
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServers.map((user) => (
                      <TableRow key={user.SQL_ADMIN_INSTANCES} className="hover:bg-muted/20">
                        <TableCell className="text-center text-foreground">
                          <a
                            href="#"
                            onClick={() => handleUserIdClick(user.Server_Type)}
                            className="text-primary hover:underline"
                          >
                           
                           <Button
    variant="link"
    onClick={() => handleUserIdClick(user.Server_Type)}
    className="text-primary hover:underline hover:text-blue-700 transition duration-200"
  >
    {user.Server_Type || "N/A"}
  </Button>
                          </a>
                        </TableCell>
                        <TableCell className="text-center text-foreground">
                          {user.SQL_ADMIN_INSTANCES || "N/A"}
                        </TableCell>
                        <TableCell className="text-center text-foreground">
                          {user.SQL_NET_DATABASE || "N/A"}
                        </TableCell>
                        <TableCell className="text-center text-foreground">
                          {user.SQL_EQP_DATABASE || "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} className="text-muted-foreground">
                        Total Servers: {filteredServers?.length || 0}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              {filteredServers?.length === 0 && searchResultsFound && (
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
    </div>
  );
};