/* eslint-disable no-unused-vars */
import { DeleteSectionApi, ViewSectionApi } from "@/api/Api";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

function Section() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              console.log(row.original.id);
              setSelectedRows((prev) => {
                return [...prev, row.original.id];
              });
            } else {
              setSelectedRows((prev) => {
                return prev.filter((item) => item !== row.original.id);
              });
            }
            return row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
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
      header: "DeviceNumber",
    },
    {
      accessorKey: "DeviceType",
      header: "DeviceType",
    },
    {
      accessorKey: "SectionID",
      header: "SectionID",
    },
    {
      accessorKey: "FromNodeID",
      header: "FromNodeID",
    },
    {
      accessorKey: "FromNodeX",
      header: "FromNodeX",
    },
    {
      accessorKey: "FromNodeY",
      header: "FromNodeY",
    },
    {
      accessorKey: "ToNodeX",
      header: "ToNodeX",
    },
    {
      accessorKey: "ToNodeY",
      header: "ToNodeY",
    },
    {
      accessorKey: "Phase",
      header: "Phase",
    },
    {
      accessorKey: "EquipmentID",
      header: "EquipmentID",
    },
    {
      accessorKey: "Mode",
      header: "Mode",
    },
  ];

  // query
  const dataQuery = useQuery({
    queryKey: ["get-section-data"],
    queryFn: () => dispatch(ViewSectionApi()),
  });

  const deleteEntryMutation = useMutation({
    mutationFn: ({ id }) => {
      return dispatch(DeleteSectionApi({ id }));
    },
    onMutate: () => {
      toast.loading("Sending...", { id: "loading-toast" });
      console.log("Deleting...");
    },
    onSuccess: (data) => {
      toast.dismiss("loading-toast");
      toast.success("Deleted Successfully");
      setSelectedRows([]);
    },
    onError: (error) => {
      console.log("error occurred", error);
      toast.dismiss("loading-toast");
      toast.error("Error occurred");
    },
  });

  const handleClick = async () => {
    if (selectedRows.length > 0) {
      const deletePromises = selectedRows.map((item) => {
        return deleteEntryMutation.mutateAsync({
          id: item,
        });
      });
      await Promise.all(deletePromises);
    }
    queryClient.invalidateQueries({ queryKey: ["get-section-data"] });
  };

  return (
    <div className="bg-background  py-3 px-6">
        <div className="flex flex-row items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Section
              </h3>
            </div>
            <Button
              className="my-3 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-black"
              onClick={handleClick}
            >
              Delete Section
            </Button>
          </div>
      <Card className="shadow-sm border-border">
        
      <CardContent className="p-2 overflow-y-auto">
          {dataQuery.isLoading && <p>Loading...</p>}

          {dataQuery.isSuccess && (
            <div className="overflow-x-auto">
              <DataTable
                columns={columns}
                data={dataQuery.data.payload.output}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Section;
