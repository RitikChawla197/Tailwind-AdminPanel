import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import ContextSlice from './slices/contextslice';
import RecentLogsSlice from './slices/RecentLogsSlice';
import AllUserSlice from './slices/AllUserSlice';
import UserProfileViewSlice from './slices/UserProfileViewSlice';
import AllEnvironmentsSlice from './slices/AllEnvironmentsSlice';
import AllNewConnectionViewSlice from './slices/AllNewConnectionViewSlice';
import UpdateConnectionUserSlice from './slices/UpdateConnectionUserSlice';
import ViewDeviceSlice from './slices/ViewDeviceSlice';
import GroupAllUserProfileViewSlice from './slices/GroupAllUserProfileViewSlice';
import GroupViewSlice from './slices/GroupViewSlice';
import GroupUserProfileViewSlice from './slices/GroupUserProfileViewSlice';
import TableUserProfileViewSlice from './slices/TableUserProfileViewSlice';
import AuthPermissionsViewSlice from './slices/AuthPermissionsViewSlice';
import TableAllUserProfileViewSlice from './slices/TableAllUserProfileViewSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    context:ContextSlice,
    RecentLogs : RecentLogsSlice,
    AllUserData: AllUserSlice,
    Profiledata:UserProfileViewSlice,
    AllEnvironmentsData: AllEnvironmentsSlice,
    AllNewConnectionViewData: AllNewConnectionViewSlice,
    UpdateConnection : UpdateConnectionUserSlice,
    DeviceView: ViewDeviceSlice,
    AllGroupPermissionView:GroupAllUserProfileViewSlice,
    GroupView:GroupViewSlice,
    GroupUserPermissionView:GroupUserProfileViewSlice,
    UserTableProfileView:TableUserProfileViewSlice,
    AuthPermissions: AuthPermissionsViewSlice,
    AllTablePermission:TableAllUserProfileViewSlice,
  },
});

export default store;