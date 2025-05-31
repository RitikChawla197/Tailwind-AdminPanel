/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert"; // For user feedback
import { DeleteDeviceApi, ViewDeviceApi } from "@/api/Api";

export default function Device() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState(false); // Loading state
  const [feedback, setFeedback] = useState({ message: "", type: "" }); // Success/error feedback

  const { ViewDeviceData } = useSelector((state) => state.DeviceView);
  const data = ViewDeviceData?.output || [];

  // Fetch devices on mount
  useEffect(() => {
    dispatch(ViewDeviceApi());
  }, [dispatch]);

  const columns = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "NetworkId",
        header: "Network ID",
      },
      {
        accessorKey: "Username",
        header: "Username",
      },
      {
        accessorKey: "DeviceNumber",
        header: "Device Number",
      },
      {
        accessorKey: "DeviceType",
        header: "Device Type",
      },
      {
        accessorKey: "SectionID",
        header: "Section ID",
      },
      {
        accessorKey: "EquipmentID",
        header: "Equipment ID",
      },
      {
        accessorKey: "Location",
        header: "Location",
      },
      {
        accessorKey: "PhaseType",
        header: "Phase Type",
      },
      {
        accessorKey: "ConnectedKVA1",
        header: "Connected KVA1",
      },
      {
        accessorKey: "ConnectedKVA2",
        header: "Connected KVA2",
      },
      {
        accessorKey: "ConnectedKVA3",
        header: "Connected KVA3",
      },
      {
        accessorKey: "ConnectedKVA7",
        header: "Connected KVA7",
      },
      {
        accessorKey: "Phase1",
        header: "Phase1",
      },
      {
        accessorKey: "Phase2",
        header: "Phase2",
      },
      {
        accessorKey: "Phase3",
        header: "Phase3",
      },
      {
        accessorKey: "Phase7",
        header: "Phase7",
      },
      {
        accessorKey: "CustomerType",
        header: "Customer Type",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleDeleteDevice = async () => {
    try {
      setIsDeleting(true);
      setFeedback({ message: "", type: "" });
  
      const selectedRows = table.getSelectedRowModel().rows;
      const idsToDelete = selectedRows.map((row) => row.original?.id);
  
      if (idsToDelete.length === 0) {
        setFeedback({ message: "No devices selected.", type: "error" });
        setTimeout(() => setFeedback({ message: "", type: "" }), 2000); // Clear after 2 seconds
        return;
      }
  
      console.log("Selected IDs:", idsToDelete);
  
      const deletePromises = idsToDelete.map(async (id) => {
        const jsonData = { id: `${id}` };
        const response = await dispatch(DeleteDeviceApi(jsonData)).unwrap();
        console.log(`Response for ID ${id}:`, response);
      });
  
      await Promise.all(deletePromises);
  
      // Refresh the table data
      await dispatch(ViewDeviceApi());
  
      // Reset row selection
      table.resetRowSelection();
  
      setFeedback({ message: "Devices deleted successfully.", type: "success" });
      setTimeout(() => setFeedback({ message: "", type: "" }), 2000); // Clear after 2 seconds
    } catch (error) {
      console.error("Error deleting devices:", error);
      setFeedback({ message: "Failed to delete devices.", type: "error" });
      setTimeout(() => setFeedback({ message: "", type: "" }), 2000); // Clear after 2 seconds
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-background  py-3 px-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Device</h3>
            </div>
            <Button
              className="my-3 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-black"
              onClick={handleDeleteDevice}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Device"}
            </Button>
          </div>
          <Card className="shadow-sm border-border">
        

          <CardContent className="p-2 overflow-y-auto">
          {feedback.message && (
            <Alert
              variant={feedback.type === "success" ? "default" : "destructive"}
              className="mb-4"
            >
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}

          <div className="mb-4 flex items-center gap-2">
            <Input
              placeholder="Search by device ID, name, or feeder"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-muted"
            />
            <Button variant="outline">Search</Button>
          </div>

          <div className=" overflow-y-auto">
               <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-center sticky top-0 z-10 bg-muted/50"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/20">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-center text-foreground"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}