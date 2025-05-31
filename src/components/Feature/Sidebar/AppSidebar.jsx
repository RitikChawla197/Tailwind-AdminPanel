import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import tridentlogo from "@/assets/tridentlogo.png";
import { Boxes, ChartNetwork, ChevronRight, Cone, Container, IdCard, LayoutDashboard, Logs, SplinePointer, Users } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { useDispatch, useSelector } from 'react-redux';
import { AdminCentralDataStatus } from '@/store/slices/contextslice';

export function AppSidebar() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.context.AdminCentralStatus);

  const items = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      status: "Dashboard",
      onClick: () => dispatch(AdminCentralDataStatus("Dashboard")),
    },
    {
      title: "Users",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "User Info",
          status: "Userinfo",
          onClick: () => dispatch(AdminCentralDataStatus("Userinfo")),
        },
        {
          title: "Create User",
          status: "CreateUser",
          onClick: () => dispatch(AdminCentralDataStatus("CreateUser")),
        },
      ],
    },
    {
      title: "Environment",
      icon: Container,
      status: "Environment",
      onClick: () => dispatch(AdminCentralDataStatus("Environment")),
    },
    {
      title: "New Connection",
      icon: ChartNetwork,
      isActive: true,
      items: [
        {
          title: "Connection Info",
          status: "NewConnection",
          onClick: () => dispatch(AdminCentralDataStatus("NewConnection")),
        },
        {
          title: "Add Connection",
          status: "AddConnection",
          onClick: () => dispatch(AdminCentralDataStatus("AddConnection")),
        },
      ],
    },
    {
      title: "Recent Logs",
      icon: Logs,
      status: "RecentLogs",
      onClick: () => dispatch(AdminCentralDataStatus("RecentLogs")),
    },
    {
      title: "Section",
      icon: SplinePointer,
      status: "Section",
      onClick: () => dispatch(AdminCentralDataStatus("Section")),
    },
    {
      title: "Device",
      icon: Cone,
      status: "Device",
      onClick: () => dispatch(AdminCentralDataStatus("Device")),
    },
    {
      title: "Group Permissions",
      icon: Boxes,
      status: "GroupPermissions",
      onClick: () => dispatch(AdminCentralDataStatus("GroupPermissions")),
    },
    {
      title: "Table Permissions",
      icon: IdCard,
      status: "TablePermissions",
      onClick: () => dispatch(AdminCentralDataStatus("TablePermissions")),
    },
  ];

  return (
    <Sidebar variant="inset" className="bg-gray-100 dark:bg-gray-900 h-screen w-64">
      <SidebarHeader className="p-4 border-b dark:border-gray-700">
        <img
          src={tridentlogo}
          alt="Trident Logo"
          className="w-32 object-contain"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item, index) => {
              const isActive = item.status === status; // Highlight if status matches
              if (item.items && item.items.length > 0) {
                return (
                  <Collapsible
                    key={index}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`flex items-center text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 ${
                            isActive ? "bg-gray-300 dark:bg-gray-700" : ""
                          }`}
                        >
                          <item.icon className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-300" />
                          <span className="text-[16px]">{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-gray-600 dark:text-gray-300" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((entry, subIndex) => {
                            const isSubActive = entry.status === status; // Highlight sub-item if status matches
                            return (
                              <SidebarMenuSubItem key={subIndex}>
                                <SidebarMenuSubButton
                                  onClick={() => entry.onClick && entry.onClick()}
                                  className={`flex items-center p-2 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 ${
                                    isSubActive ? "bg-gray-300 dark:bg-gray-700" : ""
                                  }`}
                                >
                                  <span className="text-[16px]">{entry.title}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              } else {
                return (
                  <SidebarMenuItem key={index} className="flex items-center gap-2">
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => item.onClick && item.onClick()}
                      className={`flex items-center p-2 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 text-[16px] ${
                        isActive ? "bg-gray-300 dark:bg-gray-700" : ""
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-300" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }
            })}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">© 2025 Trident AdminPanel</div>
      </SidebarFooter>
    </Sidebar>
  );
}