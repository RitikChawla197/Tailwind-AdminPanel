"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent,CardFooter  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { LogsData } from "@/api/Api";

export default function RecentLogs() {
  const dispatch = useDispatch();
  const { RecentLogdata } = useSelector((state) => state.RecentLogs);

  const [date, setDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState("");

  const formattedDate = format(date, "ddMMyyyy");

  useEffect(() => {
    const formattedDate = format(date || new Date(), "ddMMyyyy");
    dispatch(LogsData({ Date: formattedDate }));
  }, [date, dispatch]);
  

  const handleLoadLogs = () => {
    dispatch(LogsData({ Date: formattedDate }));
  };

  const logsArray = Array.isArray(RecentLogdata?.logs)
    ? RecentLogdata.logs
    : [];

  const filteredLogs = logsArray.filter((log) =>
    log.toLowerCase().includes(searchInput.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
const logsPerPage = 20;

const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
const startIndex = (currentPage - 1) * logsPerPage;
const currentLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);


  return (
    <div className="bg-background  py-3 px-6">
       <h3 className="text-2xl font-bold text-foreground mb-4">Recent Logs</h3>
     <Card className="shadow-sm border-border">
        
     <CardContent className="p-2 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
            {/* Date Picker */}
            <div className="flex whitespace-nowrap gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button onClick={handleLoadLogs} className="w-[240px]">
                Load Logs
              </Button>
            </div>

            {/* Search Field */}
          </div>
            <Input
              type="search"
              placeholder="Search logs..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full md:w-1/2 mb-4"
            />

          {/* Table */}
          <div className="max-h-[50vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Log</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {currentLogs.length > 0 ? (
  currentLogs.map((log, index) => {

                    const match = log.match(/\[([^\]]+)]\s+(.*)/);
                    const timestamp = match?.[1] ?? "";
                    const message = match?.[2] ?? log;

                    return (
                      <TableRow key={index}>
                        <TableCell className="whitespace-nowrap">
                          {timestamp}
                        </TableCell>
                        <TableCell className="text-left">{message}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-4">
                      No logs found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4">
  <Button
    variant="outline"
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    Previous
  </Button>
  <span className="text-sm text-muted-foreground">
    Page {currentPage} of {totalPages}
  </span>
  <Button
    variant="outline"
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    Next
  </Button>
</CardFooter>

      </Card>
    </div>
  );
}
