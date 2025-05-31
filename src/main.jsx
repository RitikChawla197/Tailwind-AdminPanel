/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import store from "./store";
import "./index.css";
import App from "./App.jsx";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { AppSidebar } from "./components/Feature/Sidebar/AppSidebar";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { ModeToggle } from "./components/ModeToggle";

const queryClient = new QueryClient();

function ConditionalSidebar() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";
  return !hideSidebar ? <AppSidebar /> : null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <SidebarProvider>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
              <ConditionalSidebar />
              <main className="overflow-y-auto w-full">
<div className="flex items-center justify-between">
                <SidebarTrigger />
                <ModeToggle />
                </div>
                <App />
              </main>
            </ThemeProvider>
          </SidebarProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);