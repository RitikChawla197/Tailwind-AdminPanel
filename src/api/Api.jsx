import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const UserRecentLogoutApi = createAsyncThunk("UserLoginLogoutApi", async () => {
    // 
    // let API = "http://192.168.1.177:2931/networkdata/";
    let API = "http://103.8.43.34:2941/AdminPanel/user/logout/";
    const response = await axios({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      url: API,
      method: "GET",
    });
    ;
    return response.data;
  });


  export const AllUserApi = createAsyncThunk("AllUserApi", async () => {
    // 
    // let API = "http://192.168.1.177:2931/networkdata/";
    let API = "http://103.8.43.34:2941/AdminPanel/user/UserView/";
    const response = await axios({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      url: API,
      method: "GET",
    });
    // ;
    return response.data;
  });


  export const UserProfileView = createAsyncThunk(
    "UserProfileView",
    
    async (jsonData) => {
      
      // let API = "http://192.168.1.177:2931/networkdata/";
      let API = "http://103.8.43.34:2941/AdminPanel/user/Profile/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );  

  export const AllEnvironmentApi = createAsyncThunk("AllEnvironmentApi", async () => {
    // 
    // let API = "http://192.168.1.177:2931/networkdata/";
    let API = "http://103.8.43.34:2941/AdminPanel/user/Environment/";
    const response = await axios({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      url: API,
      method: "GET",
    });
    // ;
    return response.data;
  });


  export const EnvironmentUpdateApi = createAsyncThunk(
    "EnvironmentUpdateApi",
    
    async (jsonData,thunkAPI) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      let API = "http://103.8.43.34:2941/AdminPanel/user/Environment/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );


  export const UpdateConnectionUserViewApi = createAsyncThunk(
    "UpdateConnectionUserViewApi",
    
    async (jsonData) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      
      let API = "http://103.8.43.34:2941/AdminPanel/user/NSC_LTAugmentation_UserView/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );


  export const AllNewConnectionViewApi = createAsyncThunk("AllNewConnectionApi", async () => {
    // 
    // let API = "http://192.168.1.177:2931/networkdata/";
    let API = "http://103.8.43.34:2941/AdminPanel/user/NSC_LTAugmentationViewAndADD_/";
    const response = await axios({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      url: API,
      method: "GET",
    });
    // ;
    return response.data;
  });

  export const NewConnectionAddApi = createAsyncThunk(
    "NewConnectionAddApi",
    
    async (jsonData) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      
      let API = "http://103.8.43.34:2941/AdminPanel/user/NSC_LTAugmentationViewAndADD_/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );


  export const UserDeleteApi = createAsyncThunk(
    "UserDeleteApi",
    
    async (jsonData,thunkAPI) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      let API = "http://103.8.43.34:2941/AdminPanel/user/UserDelete/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );

  export const UserUpdateApi = createAsyncThunk(
    "UserUpdateApi",
    
    async (jsonData,thunkAPI) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      let API = "http://103.8.43.34:2941/AdminPanel/user/UserView/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );

  export const DeleteNewConnectionApi = createAsyncThunk(
    "DeleteNewConnectionApi",
    
    async (jsonData) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      
      let API = "http://103.8.43.34:2941/AdminPanel/user/NSC_LTAugmentation_Delete/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );


  export const NewConnectionUpdateUserApi = createAsyncThunk(
    "NewConnectionUpdateUserApi",
    
    async (jsonData) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      
      let API = "http://103.8.43.34:2941/AdminPanel/user/NSC_LTAugmentation_Update/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );


  export const DeleteDeviceApi = createAsyncThunk(
    "DeleteDeviceApi",
    async (jsonData) => {
      let API = "http://103.8.43.34:2941/AdminPanel/user/DeviceViewAndDelete/";
      const response = await axios({
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        url: API,
        method: "POST",
        data: jsonData,
      });
      
      return response.data;
    }
  );
  
  export const ViewDeviceApi = createAsyncThunk("ViewDeviceApi", async () => {
    // let API = "http://192.168.1.177:2931/networkdata/";
    let API = "http://103.8.43.34:2941/AdminPanel/user/DeviceViewAndDelete/";
    const response = await axios({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access")}`,
        // "Content-Type": "application/json",
      },
      url: API,
      method: "GET",
    });
    ;
    return response.data;
  });

  export const DeleteSectionApi = createAsyncThunk(
    "DeleteSectionApi",
    async (jsonData) => {
      let API = "http://103.8.43.34:2941/AdminPanel/user/SectionViewAndDelete/";
  
      const response = await axios({
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        url: API,
        method: "POST",
        data: jsonData,
      });
  
      return response.data;
    }
  );

  export const ViewSectionApi = createAsyncThunk("ViewSectionApi", async () => {

    let API = "http://103.8.43.34:2941/AdminPanel/user/SectionViewAndDelete/";
    const response = await axios({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      url: API,
      method: "GET",
      // data: jsonData,
    });
    return response.data;
  });

  export const AllGroupViewApi = createAsyncThunk("AllGroupViewApi", async () => {
    // 
    // let API = "http://192.168.1.177:2931/networkdata/";
    let API = "http://103.8.43.34:2941/AdminPanel/user/NetworkListViewAndUpdate/";
    const response = await axios({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      url: API,
      method: "GET",
    });
    // ;
    return response.data;
  });

  
  export const GroupUserProfileViewApi = createAsyncThunk(
    "UserGroupPermissionViewApi",
    
    async (jsonData) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      
      let API = "http://103.8.43.34:2941/AdminPanel/user/UserAssignNetworks/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );

  export const AllGroupPermissionViewApi = createAsyncThunk("AllGroupPermissionViewApi", async () => {
    // 
    // let API = "http://192.168.1.177:2931/networkdata/";
    let API = "http://103.8.43.34:2941/AdminPanel/user/UserAssignNetworks/";
    const response = await axios({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      url: API,
      method: "GET",
    });
    // ;
    return response.data;
  });

  export const saveNetworkListApi = createAsyncThunk(
    "saveNetworkListApi",
    
    async (jsonData) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      
      let API = "http://103.8.43.34:2941/AdminPanel/user/NetworkListViewAndUpdate/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );


  export const AuthPermissionsViewApi = createAsyncThunk("AuthPermissionsViewApi", async () => {
    // 
    // let API = "http://192.168.1.177:2931/networkdata/";
    let API = "http://103.8.43.34:2941/AdminPanel/user/AuthPermissionsView/";
    const response = await axios({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      url: API,
      method: "GET",
    });
    // ;
    return response.data;
  });

  export const TableUserProfileViewApi = createAsyncThunk(
    "TableUserProfileViewApi",
    
    async (jsonData) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      
      let API = "http://103.8.43.34:2941/AdminPanel/user/UserPermissionsView/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );


  export const LogsData = createAsyncThunk(
    "LogsData",
    
    async (jsonData) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      
      let API = "http://103.8.43.36:2931/AdminPanel/user/logs/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );

  export const AllTablePermissionViewApi = createAsyncThunk("AllTablePermissionViewApi", async () => {
    // 
    // let API = "http://192.168.1.177:2931/networkdata/";
    let API = "http://103.8.43.34:2941/AdminPanel/user/UserPermissionsView/";
    const response = await axios({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      url: API,
      method: "GET",
    });
    ;
    return response.data;
  });


  export const saveAuthPermissionsApi = createAsyncThunk(
    "saveAuthPermissionsApi",
    
    async (jsonData) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      
      let API = "http://103.8.43.34:2941/AdminPanel/user/AuthPermissionsView/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );

  
  export const RegisterUserApi = createAsyncThunk(
    "RegisterUserApi",
    
    async (jsonData,thunkAPI) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      let API = "http://103.8.43.34:2941/AdminPanel/user/register/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );

  export const AddEnvironmentApi = createAsyncThunk(
    "AddEnvironmentApi",
    
    async (jsonData,thunkAPI) => {
      // let API = "http://192.168.1.177:2931/networkdata/";
      let API = "http://192.168.1.109:6379//AdminPanel/user/AddEnvironment/";
      try {
        const response = await axios({
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          url: API,
          method: "POST",
          data: jsonData,
        });
        ;
        return response.data;
        
      } catch (error) {
        if (error.response) {
          // Detailed error from server
          console.log("Error response:", error.response);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  );
