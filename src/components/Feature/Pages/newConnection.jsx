import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AdminCentralDataStatus } from "@/store/slices/contextslice";
import {
  AllNewConnectionViewApi,
  UpdateConnectionUserViewApi,
} from "@/api/Api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Pencil } from "lucide-react";

export const NewConnection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllNewConnectionViewApi());
  }, [dispatch]);
  const { AllNSCViewdata, AllNSCViewisLoading } = useSelector(
    (state) => state.AllNewConnectionViewData
  );
  const [serverSearchInput, setServerSearchInput] = useState("");
  const [searchResultsFound, setSearchResultsFound] = useState(true);
  const [table, setTable] = useState("All");

  const handleServerSearchChange = (e) => {
    setServerSearchInput(e.target.value);
    setSearchResultsFound(true);
  };

  const handleUserIdClick = (userId) => {
    dispatch(AdminCentralDataStatus("ChangeConn"));
    dispatch(UpdateConnectionUserViewApi({ Sno: userId }));
  };

  const userData = AllNSCViewdata || { output: [] };
  let filteredUserData = userData.output.filter((user) =>
    (
      user.Sno?.toString().toLowerCase() +
      user.NearestConsumerNumber?.toLowerCase() +
      user.Status?.toLowerCase()
    ).includes(serverSearchInput.toLowerCase())
  );

  if (table === "Less than 5") {
    filteredUserData = filteredUserData.filter(
      (user) => parseFloat(user.SanctionedLoad) <= 5
    );
  } else if (table === "Greater than 5") {
    filteredUserData = filteredUserData.filter(
      (user) => parseFloat(user.SanctionedLoad) > 5
    );
  }

  return (
    <div className="bg-background  py-3 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-foreground text-2xl font-bold">
            New Connection
          </h3>
          <h6 className="text-muted-foreground mb-4">
            Select connections to change
          </h6>
        </div>
        <Link onClick={() => dispatch(AdminCentralDataStatus("AddConnection"))}>
          <Button variant="default">Add New Connection +</Button>
        </Link>
      </div>
      <Card className="shadow-sm border-border">
        <CardContent className="p-2 overflow-x-auto dark:custom-scrollbar">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Select value={table} onValueChange={setTable}>
              <SelectTrigger className="w-full sm:w-40 bg-muted">
                <SelectValue placeholder="Select table" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Less than 5">Less than 5</SelectItem>
                <SelectItem value="Greater than 5">Greater than 5</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 flex-1">
              <Input
                type="search"
                placeholder="Search"
                value={serverSearchInput}
                onChange={handleServerSearchChange}
                className="bg-muted"
              />
              <Button variant="outline">Search</Button>
            </div>
          </div>
          <div className="min-w-full overflow-x-hidden">
            <Table className="w-full table-auto">
              <TableCaption className="text-muted-foreground">
                A list of new connections.
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    Action
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    Feasibility
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    Feeder ID
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    Application ID
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    Nearest Consumer Number
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    Sanctioned Load
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    Before % VR
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    After % VR
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    Before DT Loading
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    After DT Loading
                  </TableHead>
                  <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50  whitespace-nowrap text-ellipsis overflow-hidden">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUserData.map((user) => (
                  <TableRow
                    key={user.NearestConsumerNumber}
                    className="hover:bg-muted/20"
                  >
                    <TableCell className=" text-center text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      <Button
                        onClick={() => handleUserIdClick(user.Sno)}
                        variant="ghost"
                        className="text-primary hover:text-blue-600 hover:bg-blue-100 transition-colors p-2 rounded-full"
                      >
                        <Pencil size={20} strokeWidth={1} />
                      </Button>
                    </TableCell>
                    <TableCell className=" text-center text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      {user.Feasibility === "YES" ? (
                        <CheckIcon className="text-success mx-auto h-4 w-4" />
                      ) : user.Feasibility === "NO" ? (
                        <Cross2Icon className="text-destructive mx-auto h-4 w-4" />
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className=" text-left text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      {user.Feederid || "N/A"}
                    </TableCell>
                    <TableCell className=" text-center text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      {user.ApplicationID || "N/A"}
                    </TableCell>
                    <TableCell className=" text-center text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      {user.NearestConsumerNumber || "N/A"}
                    </TableCell>
                    <TableCell className=" text-center text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      {user.SanctionedLoad || "N/A"}
                    </TableCell>
                    <TableCell className=" text-center text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      {user.Before_Percentage_VR || "N/A"}
                    </TableCell>
                    <TableCell className=" text-center text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      {user.After_Percentage_VR || "N/A"}
                    </TableCell>
                    <TableCell className=" text-center text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      {user.Before_DTLoading || "N/A"}
                    </TableCell>
                    <TableCell className=" text-center text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      {user.After_DTLoading || "N/A"}
                    </TableCell>
                    <TableCell className=" text-center text-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                      {user.Status || "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={11} className="text-muted-foreground">
                    Total Connections: {filteredUserData.length || 0}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {filteredUserData.length === 0 && searchResultsFound && (
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
          </div>
        </CardContent>
        <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d2d2d; /* Dark track to match dark mode */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #b0b0b0; /* Light gray thumb */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0a0a0; /* Slightly darker on hover */
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #b0b0b0 #2d2d2d;
        }
      `}</style>
      </Card>
    </div>
  );
};
