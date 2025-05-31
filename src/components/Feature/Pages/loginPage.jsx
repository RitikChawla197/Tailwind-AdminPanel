import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  AdminCentralDataStatus,
  LoginStatus,
} from "@/store/slices/contextslice";
import {
  AllNewConnectionViewApi,
  AllUserApi,
  UserRecentLogoutApi,
} from "@/api/Api";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    dispatch(UserRecentLogoutApi());
    dispatch(AllUserApi());
    dispatch(AllNewConnectionViewApi());
  }, [dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();
    setButtonPressed(true);
    setErrorMessage("");

    try {
      const res = await axios.post(
        "http://103.8.43.36:2931/AdminPanel/user/login/",
        {
          user_id: userId,
          password: password,
        }
      );

      localStorage.setItem("Username", res.data.Username);
      localStorage.setItem("Name", res.data.Name);
      localStorage.setItem("UserType", res.data.usertype);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("UserId", userId);

      dispatch(LoginStatus(true));
      dispatch(AdminCentralDataStatus("Dashboard"));
      setButtonPressed(false);
      navigate("/"); // ✅ Navigate to home page after successful login
    } catch (err) {
      setButtonPressed(false);
      if (err.response) {
        if (err.response.status === 404) {
          setErrorMessage("Incorrect user ID or password. Please try again.");
        } else {
          setErrorMessage(
            `Error: ${
              err.response.data.message ||
              "An error occurred. Please try again later."
            }`
          );
        }
      } else if (err.request) {
        setErrorMessage(
          "No response from the server. Please try again later."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center min-h-screen bg-gray-100"
      )}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the Admin Panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && (
                <div className="text-red-500 text-sm text-center">
                  {errorMessage}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={buttonPressed}>
                {buttonPressed ? "Logging in..." : "Login"}
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Login with Google (Coming Soon)
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
