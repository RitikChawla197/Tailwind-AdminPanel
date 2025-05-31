import { UserRecentLogoutApi } from "@/api/Api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// UserLogTable component
function UserLogTable() {
  const { RecentLogdata, RecentLogisLoading, error } = useSelector(
    (state) => state.RecentLogs
  );

  const userData =
    RecentLogdata && Array.isArray(RecentLogdata.data)
      ? RecentLogdata.data
      : [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Number of items per page
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  // Calculate the data to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = userData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (RecentLogisLoading) {
    return <p className="text-muted-foreground text-center">Loading user activity...</p>;
  }

  if (error) {
    return <p className="text-destructive text-center">Error loading data: {error.message || "Unknown error"}</p>;
  }

  if (userData.length === 0) {
    return <p className="text-muted-foreground text-center">No recent user activity found.</p>;
  }

  // Function to format timestamp (e.g., "2025-04-28 10:40:58" -> "Apr 28, 2025, 10:40 AM")
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div>
      <div className="max-h-[55vh] overflow-y-auto">
        <Table className="w-full border border-border">
         
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                ID
              </TableHead>
              <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                Login
              </TableHead>
              <TableHead className="text-center text-foreground font-medium sticky top-0 bg-muted/50 z-10">
                Log Out
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((log) => (
              <TableRow key={log.id} className="hover:bg-muted/20">
                <TableCell className="text-center text-foreground">
                  {log.id || "N/A"}
                </TableCell>
                <TableCell className="text-center text-foreground">
                  {formatTimestamp(log.login)}
                </TableCell>
                <TableCell className="text-center text-foreground">
                  {formatTimestamp(log.logout)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <Button
          className="ml-4"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <span className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
          className="mr-4"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

// Dashboard component
function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserRecentLogoutApi());
  }, [dispatch]);

  return (
    <div className="p-6 max-h-screen">
      <h1 className="text-2xl font-bold text-foreground mb-4">Dashboard</h1>
      <p className="text-muted-foreground mb-4">Welcome to the Admin Panel</p>
      <Card className="shadow-sm border-border">
        <CardHeader>
          <CardTitle className="text-foreground">User Activity</CardTitle>
        
        </CardHeader>
        <CardContent className="p-0">
          <UserLogTable />
        </CardContent>
       
      </Card>
    </div>
  );
}

export default Dashboard;