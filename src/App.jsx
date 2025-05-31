/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { AppSidebar } from './components/Feature/Sidebar/AppSidebar';
import Dashboard from './components/Feature/Pages/DashboardPage';
import { LoginForm } from './components/Feature/Pages/loginPage';
import Users from './components/Feature/Pages/Users';
import AddUser from './components/Feature/Pages/addUser';
import ChangeUser from './components/Feature/Pages/updateUser';
import { Environment } from './components/Feature/Pages/Environment';
import EnvironmentUpdate from './components/Feature/Pages/EnvironmentUpdate';
import { NewConnection } from './components/Feature/Pages/newConnection';
import AddConnection from './components/Feature/Pages/addConnection';
import ChangeConn from './components/Feature/Pages/changeConn';
import Device from './components/Feature/Pages/device';
import Section from './components/Feature/Pages/Section';
import Group from './components/Feature/Pages/Group';
import ChangeGr from './components/Feature/Pages/ChangeGr';
import TablePermit from './components/Feature/Pages/TablePermit';
import UpdateTable from './components/Feature/Pages/UpdateTable';
import RecentLogs from './components/Feature/Pages/RecentLogs';
import { AddEnvironment } from './components/Feature/Pages/addEnvironment';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const status = useSelector((state) => state.context.AdminCentralStatus);

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("access") !== null;

  // If not logged in and trying to access anything other than /login, redirect to /login
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const showSidebar = location.pathname !== "/login";

  return (
    <>
      {showSidebar && <AppSidebar />}

      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route path="/" element={
          <>
            {status === "Dashboard" && <Dashboard />}
            {status === "Userinfo" && <Users />}
            {status === "CreateUser" && <AddUser />}
            {status === "ChangeUser" && <ChangeUser />}
            {status === "Environment" && <Environment />}
            {status === "ChangeEnv" && <EnvironmentUpdate />}
            {status === "NewConnection" && <NewConnection />}
            {status === "AddConnection" && <AddConnection />}
            {status === "ChangeConn" && <ChangeConn />}
            {status === "RecentLogs" && <RecentLogs />}
            {status === "Section" && <Section />}
            {status === "Device" && <Device />}
            {status === "GroupPermissions" && <Group />}
            {status === "ChangeGr" && <ChangeGr />}
            {status === "TablePermissions" && <TablePermit />}
            {status === "UpdateTable" && <UpdateTable />}
            {status === "AddEnvironment" && <AddEnvironment />}
         
          </>
        } />

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
