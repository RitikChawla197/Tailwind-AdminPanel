import { createSlice } from "@reduxjs/toolkit";

const ContextSlice = createSlice({
  name: "centraldata",
  initialState: {
    centralstatus: null,
    NetworkColorState: "layer",
    CentralStatus: null,
    LoginState: false,
    AllLayerStatus: null,
    AdminCentralStatus: "Dashboard",
    selectedFeederinfo: [],
    selectedEditFeederinfo: [],
    selectedregioninfo: [],
    selectedzoneinfo: [],
    selectedcircleinfo: [],
    selecteddivisioninfo: [],
    selectedDatabaseinfo: [],
    selectedNewDatabaseinfo: [],
    selectedareainfo: [],
    networkLoadflow: [],
    selectedDashboardType: [],
    AdminEnvironmentStatus: "Production", //Admin Panel Environment Default Status
    tracingtypestatusinfo: null, //Upstream or Downstream Status
    traceState: null, //Trace true or False
    LastSelectedPointFeature: null,
    fdrlistFinal: null,
    networkLoadflowState: [],
    selecterFeatureState: null,
    analysisstate: null,
    reporttableinfo: false, //Report Table True or False
    reportnameinfo: "", //Report Names Saving State
    loadflowstatusinfo: false, //LoadflowStatus True or False
    shortcircuitstatusinfo: false, //ShortcircuitStatus True or False
    integrationcapacitystatusinfo: false, //IntegrationCapacity True or False
    sidebartoggle: true, //Sidebar Toggle Control
    navbartoggle: true, //Navbar toggle control
    modalstatusinfo: false, //Modal status true or false
    feedercheckstate: null,
    feedernamestate: null,
    loadflowboxinfo: false, //LoadflowBox True or False
    loadallcationstatusinfo: false, //Loadallocation True or False
    shortcircuitBoxinfo: false, //ShortcircuitBox True or False
    icaBoxinfo: false, //ICABox True or False
    newconnectionfeederstate: "No", //NewConnectionFeeder yes or no
    newconnectionSelectedfeederstate: null,
    newconnectionSelectedfeaturestate: null,
    newloadflowboxinfo: false,
    newconnboxinfo: false,
    isFullscreen: true,
    DetailForm: [],
    newconnectionAddData: null,
    newconnectionCustomerData: null,
    NewBoxTabledata: null,
    NewBoxRecordData: null,
    NewConnForms: null,
    messageinfo: true,
    Analysismessageinfo: false,
    EditLoad:null,
    SelectedProject: null,
    ReportDate:null,
    ReportResponse:null
  },
  reducers: {
    CentralDataStatus(state, action) {
      state.centralstatus = action.payload;
      // console.log(action.payload);
    },
    editload(state, action) {
      state.EditLoad = action.payload;
      // console.log(action.payload);
    },
    LoginStatus(state, action) {
      state.loginState = action.payload;
    },
    newconnectionfeederstatus(state, action) {
      // console.log(action.payload);
      state.newconnectionfeederstate = action.payload;
    },
    newconnectionSelectedfeederstatus(state, action) {
      state.newconnectionSelectedfeederstate = action.payload;
      // console.log(action.payload);
    },
    newconnectionSelectedfeaturestatus(state, action) {
      state.newconnectionSelectedfeaturestate = action.payload;
      // console.log(action.payload);
    },
    loadflowBoxstatus(state, action) {
      // console.log(action.payload);
      state.loadflowboxinfo = action.payload;
    },
    icaBoxstatus(state, action) {
      // console.log(action.payload);
      state.icaBoxinfo = action.payload;
    },
    tracestatus(state, action) {
      // console.log(action.payload);
      state.traceState = action.payload;
    },
    reporttablestatus(state, action) {
      state.reporttableinfo = action.payload;
    },
    loadflowstatus(state, action) {
      // console.log(action.payload);
      state.loadflowstatusinfo = action.payload;
    },
    shortcircuitstatus(state, action) {
      // console.log(action.payload);
      state.shortcircuitstatusinfo = action.payload;
    },

    integrationcapacitystatus(state, action) {
      // console.log(action.payload);
      state.integrationcapacitystatusinfo = action.payload;
    },
    selectedFeederinfostatus(state, action) {
      state.selectedFeederinfo = action.payload;
      // console.log(action.payload);
    },
    selectedEditFeederinfostatus(state, action) {
      state.selectedEditFeederinfo = action.payload;
      // console.log(action.payload);
    },
    selectedregioninfostatus(state, action) {
      state.selectedregioninfo = action.payload;
      // console.log(action.payload);
    },
    selectedzoneinfostatus(state, action) {
      state.selectedzoneinfo = action.payload;
      // console.log(action.payload);
    },
    selectedcircleinfostatus(state, action) {
      state.selectedcircleinfo = action.payload;
      // console.log(action.payload);
    },
    selecteddivisioninfostatus(state, action) {
      state.selecteddivisioninfo = action.payload;
      // console.log(action.payload);
    },
    selectedDatabaseinfostatus(state, action) {
      state.selectedDatabaseinfo = action.payload;
      // console.log(action.payload);
    },
    selectedNewDatabaseinfostatus(state, action) {
      state.selectedNewDatabaseinfo = action.payload;
      // console.log(action.payload);
    },
    selectedareainfostatus(state, action) {
      state.selectedareainfo = action.payload;
      // console.log(action.payload);
    },
    selectedDashboardTypestatus(state, action) {
      state.selectedDashboardType = action.payload;
      // console.log(action.payload);
    },
    DetailForminfo(state, action) {
      state.DetailForm = action.payload;
      // console.log(action.payload);
    },
    reportName(state, action) {
      state.reportnameinfo = action.payload;
    },
    analysisstatus(state, action) {
      // console.log(action.payload);
      state.analysisstate = action.payload;
    },
    selectedNetworkinfostatus(state, action) {
      state.networkLoadflowState = action.payload;
      // console.log(action.payload);
    },
    NetworkColorStatus(state, action) {
      // console.log(action.payload);
      state.NetworkColorState = action.payload;
    },
    LastSelectedPointFeatureStatus(state, action) {
      // console.log(action.payload);
      state.LastSelectedPointFeature = action.payload;
    },
    LayerSelectionStatus(state, action) {
      // console.log(action.payload);
      state.AllLayerStatus = action.payload;
    },
    AdminCentralDataStatus(state, action) {
      state.AdminCentralStatus = action.payload;
    },
    AdminEnvironmentDataStatus(state, action) {
      state.AdminEnvironmentStatus = action.payload;
    },
    fdrlistFinal(state, action) {
      state.fdrlistFinal = action.payload;
      // console.log(state.fdrlistFinal, "IIIIIII");
    },
    tracingtypestatus(state, action) {
      // console.log(action.payload);
      state.tracingtypestatusinfo = action.payload;
    },
    selecterFeatureStatus(state, action) {
      // console.log(selecterFeatureStatus,"SFSFSFSFSSSF");
      state.selecterFeatureState = action.payload;
    },
    sidebartogglestatus(state, action) {
      // console.log(action.payload)
      state.sidebartoggle = action.payload;
    },
    navbartogglestatus(state, action) {
      // console.log(action.payload)
      state.navbartoggle = action.payload;
    },
    modalstatus(state, action) {
      // console.log(action.payload);
      state.modalstatusinfo = action.payload;
    },
    shortcircuitBoxstatus(state, action) {
      // console.log(action.payload);
      state.shortcircuitBoxinfo = action.payload;
    },
    loadallocationstatus(state, action) {
      state.loadallcationstatusinfo = action.payload;
    },
    sidebarselectstatus(state, action) {
      state.sidebarselectstate = action.payload;
    },
    feedercheckstatus(state, action) {
      state.feedercheckstate = action.payload;
    },
    feedernamestatus(state, action) {
      state.feedernamestate = action.payload;
    },
    newloadflowBoxstatus(state, action) {
      // console.log(action.payload);
      state.newloadflowboxinfo = action.payload;
    },
    newconnBoxstatus(state, action) {
      // console.log(action.payload);
      state.newconnboxinfo = action.payload;
    },
    toggleFullscreen(state, action) {
      state.isFullscreen = action.payload;
    },
    newConnectionAddData(state, action) {
      console.log(action.payload);

      state.newconnectionAddData = action.payload;
    },
    newConnectionCustomerData(state, action) {
      state.newconnectionCustomerData = action.payload;
    },
    newboxrecord(state, action) {
      state.NewBoxRecordData = action.payload;
    },
    newboxtable(state, action) {
      state.NewBoxTabledata = action.payload;
    },
    newconnformvs(state, action) {
      state.NewConnForms = action.payload;
    },
    messagestatus(state, action) {
      state.messageinfo = action.payload;
    },
    Analysismessagestatus(state, action) {
      state.Analysismessageinfo = action.payload;
    },
    SelectedProjectstatus(state, action) {
      state.SelectedProject = action.payload;
    },
    ReportDatestatus(state, action) {
      state.ReportDate = action.payload;
    },
    ReportResponsestatus(state, action) {
      state.ReportResponse = action.payload;
    },
    

  },
});

export default ContextSlice.reducer;
export const {
  CentralDataStatus,
  editload,
  NetworkColorStatus,
  reporttablestatus,
  LastSelectedPointFeatureStatus,
  LoginStatus,
  LayerSelectionStatus,
  AdminCentralDataStatus,
  selectedFeederinfostatus,
  selectedEditFeederinfostatus,
  DetailForminfo,
  AdminEnvironmentDataStatus,
  fdrlistFinal,
  tracestatus,
  reportName,
  loadflowstatus,
  loadflowBoxstatus,
  shortcircuitstatus,
  integrationcapacitystatus,
  tracingtypestatus,
  selectedregioninfostatus,
  selectedzoneinfostatus,
  selectedcircleinfostatus,
  selecteddivisioninfostatus,
  selectedDatabaseinfostatus,
  selectedNewDatabaseinfostatus,
  selectedareainfostatus,
  selectedDashboardTypestatus,
  selectedNetworkinfostatus,
  selecterFeatureStatus,
  analysisstatus,
  sidebartogglestatus,
  navbartogglestatus,
  sidebarselectstatus,
  modalstatus,
  feedercheckstatus,
  feedernamestatus,
  shortcircuitBoxstatus,
  loadallocationstatus,
  icaBoxstatus,
  newconnectionfeederstatus,
  newconnectionSelectedfeederstatus,
  newconnectionSelectedfeaturestatus,
  newloadflowBoxstatus,
  newconnBoxstatus,
  toggleFullscreen,
  newConnectionAddData,
  newConnectionCustomerData,
  newboxrecord,
  newboxtable,
  newconnformvs,
  messagestatus,
  Analysismessagestatus,
  SelectedProjectstatus,
  ReportResponsestatus,ReportDatestatus
} = ContextSlice.actions;
