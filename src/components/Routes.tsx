import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import PublicRoutes from "../components/PublicRoutes";
import InnerContent from "./InnerContent";
import Dashboard from "../pages/Dashboard";
import UserDashboard from "../pages/UserDashboard";
import Login from "../pages/Login";
import LoginType from "../pages/login/LoginType";
import ChangePassword from "../pages/login/ChangePassword";
import RecoverUsername from "../pages/login/RecoverUsername";
import ResetPassword from "../pages/login/ResetPassword";
import OneTimePassword from "../pages/login/OneTimePassword";

import MasterManagement from "../pages/MasterManagement";
import DepartmentData from "../pages/MasterData/DepartmentData";
import ManageDepartmentData from "../pages/MasterData/ManageDepartmentData";
import EditManageDepartmentData from "../pages/MasterData/department/EditManageDepartmentData";

import AddDepartment from "../pages/MasterData/department/AddDepartment";
import ManageDepatment from "../pages/MasterData/department/ManageDepatment";
import EditDepartment from "../pages/MasterData/department/EditDepartment";
import AddDesignation from "../pages/MasterData/designation/AddDesignation";
import ManageDesignation from "../pages/MasterData/designation/ManageDesignation";
import EditDesignation from "../pages/MasterData/designation/EditDesignation";

import LabelData from "../pages/MasterData/labels/AddLabel";
import ManageLabelData from "../pages/MasterData/labels/ManageLabel";
import EditLabelData from "../pages/MasterData/labels/EditLabel";

import ManageTechnicalSkillData from "../pages/MasterData/technicalskils/ManageTechnicalSkillData";
import TechnicalSkillData from "../pages/MasterData/technicalskils/TechnicalSkillData";
import EditManageTechnicalSkillData from "../pages/MasterData/technicalskils/EditManageTechnicalSkillData";
import AchievementData from "../pages/MasterData/acheivement/AcheivementData";
import EditAchievementData from "../pages/MasterData/acheivement/EditAchievement";
import ManageAchievementData from "../pages/MasterData/acheivement/ManageAcheivementData";

import AddChannelData from "../pages/MasterData/channel/AddChannelData";
import EditManageChannelData from "../pages/MasterData/channel/EditManageChannelData";
import ManageChannelData from "../pages/MasterData/channel/ManageChannelData";

import AddDocumentList from "../pages/MasterData/documentlist/AddDocumentList";
import EditManageDocumentListData from "../pages/MasterData/documentlist/EditManageDocumentListData";
import ManageDocumentListData from "../pages/MasterData/documentlist/ManageDocumentListData";

import AddHodData from "../pages/MasterData/headofdepartment/AddHOdData";
import ManageHodData from "../pages/MasterData/headofdepartment/ManageHOdData";
import EditHodData from "../pages/MasterData/headofdepartment/EditManageHOdData";

import Escalation from "../pages/escalationProcess/Escalation";
import ForgotPassword from "../pages/login/ForgotPassword";
const MainRoutes = (props: any) => (
  <Routes>
    <Route path="/" element={<PublicRoutes />}>
      <Route path="/" element={<Navigate replace to="login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/facing-issue" element={<LoginType />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/recover-username" element={<RecoverUsername />} />
    </Route>
    <Route path="/" element={<ProtectedRoutes />}>
      <Route path="/" element={<InnerContent />}>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/" element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        
        <Route path="/master-management" element={<MasterManagement />} />
        

        <Route path="/editDepartment/:id" element={<EditDepartment />} />
        
        <Route path="/add-department" element={<AddDepartment />} />
        <Route path="/manage-department" element={<ManageDepatment />} />
        <Route path="/add-designation" element={<AddDesignation />} />
        <Route path="/manage-designation" element={<ManageDesignation />} />

        <Route path="/add-label" element={<LabelData />} />
        <Route path="/edit-label/:id" element={<EditLabelData />} />
        <Route path="/manage-label" element={<ManageLabelData />} />

        <Route path="/manage-department" element={<ManageDepatment />} />
        <Route path="/add-designation" element={<AddDesignation />} />
        <Route path="/manage-designation" element={<ManageDesignation />} />

        <Route
          path="/manage-technicalskill"
          element={<ManageTechnicalSkillData />}
        />
        <Route path="/add-technicalskill" element={<TechnicalSkillData />} />
        <Route
          path="/edit-technicalskill/:id"
          element={<EditManageTechnicalSkillData />}
        />

        <Route
          path="/manage-documentlist/:id"
          element={<EditManageDocumentListData />}
        />
        <Route path="/add-documentlist" element={<AddDocumentList />} />
        <Route
          path="/editmanage-documentlist"
          element={<ManageDocumentListData />}
        />
        <Route path="/manage-HodData/" element={<ManageHodData />} />
        <Route path="/edit-HodData/:id" element={<EditHodData />} />

        <Route path="/manage-channel/:id" element={<EditManageChannelData />} />
        <Route path="/edit-channel/:id" element={<EditManageChannelData />} />
        <Route path="/add-channel" element={<AddChannelData />} />
        <Route path="/editmanage-channel" element={<ManageChannelData />} />

        <Route path="/add-achievement" element={<AchievementData />} />
        <Route path="/editachievement/:id" element={<EditAchievementData />} />
        <Route path="/edit-Designation/:id" element={<EditDesignation />} />
        <Route path="/manageachievement" element={<ManageAchievementData />} />
       
        
        <Route path="/escalation" element={<Escalation />} />
       
      </Route>
    </Route>
  </Routes>
);

export default MainRoutes;
