import { combineReducers } from 'redux';
const Fill_Master_Permission = 'Fill_Master_Permission';
const Empty_Master_Permission = 'Empty_Master_Permission';

const defaultPermissions = 
  {
    access: false,
    module_MasterConfiguration_Access:false,

  page_ManageDepartments_Access:false,
  tab_ManageDepartmentsListing_Access:false,
  action_ManageDepartmentsListing_Add_Access:false,
  action_ManageDepartmentsListing_Edit_Access:false,
  action_ManageDepartmentsListing_Delete_Access:false,

  page_ManageDesignation_Access:false,
  tab_ManageDesignationListing_Access:false,
  action_ManageDesignationListing_Add_Access:false,
  action_ManageDesignationListing_Edit_Access:false,
  action_ManageDesignationListing_Delete_Access:false,

  page_ManageSkill_Access:false,
  tab_ManageSkillListing_Access:false,
  action_ManageSkillListing_Add_Access:false,
  action_ManageSkillListing_Edit_Access:false,
  action_ManageSkillListing_Delete_Access:false,

  page_ManageLabels_Access:false,
  tab_ManageLabelsListing_Access:false,
  action_ManageLabelsListing_Add_Access:false,
  action_ManageLabelsListing_Edit_Access:false,
  action_ManageLabelsListing_Delete_Access:false,

  page_ManageChannels_Access:false,
  tab_ManageChannelsListing_Access:false,
  action_ManageChannelsListing_Add_Access:false,
  action_ManageChannelsListing_Edit_Access:false,
  action_ManageChannelsListing_Delete_Access:false,

  page_ManageHeadOfDepartments_Access:false,
  tab_ManageHeadOfDepartmentsListing_Access:false,
  action_ManageHeadOfDepartmentsListing_Add_Access:false,
  action_ManageHeadOfDepartmentsListing_Edit_Access:false,
  action_ManageHeadOfDepartmentsListing_Delete_Access:false,
    
  }

export function FillMasterPermission(module) {
  return {
    type: Fill_Master_Permission,
    module,
  }
}
export function EmptyMasterPermission() {
  return {
    type: Empty_Master_Permission,defaultPermissions
  }
}

function MasterPermission(state = defaultPermissions, action) {
    switch (action.type) {
        case Fill_Master_Permission:
          
            var data = action.module;
            var permissions=defaultPermissions;
            if (data) { 
              permissions.access=true;
              permissions.module_MasterConfiguration_Access = true;
              if (data.listPageMaster && data.listPageMaster.length > 0) {
                data.listPageMaster.forEach((page) => {
                  if (page.pageName === "Departments") {
                    permissions.page_ManageDepartments_Access = true;
                    if (page.listTabMaster && page.listTabMaster.length > 0) {
                      page.listTabMaster.forEach((tabs) => {
                        if (tabs.tabName === "Departments Listing") {
                          permissions.tab_ManageDepartmentsListing_Access = true;
                          if (
                            tabs.listActionMaster &&
                            tabs.listActionMaster.length > 0
                          ) {
                            tabs.listActionMaster.forEach((actions) => {
                              if (actions.actionName === "Add") {
                                permissions.action_ManageDepartmentsListing_Add_Access = true;
                              }
                              if (actions.actionName === "Edit") {
                                permissions.action_ManageDepartmentsListing_Edit_Access = true;
                              }
                              if (actions.actionName === "Delete") {
                                permissions.action_ManageDepartmentsListing_Delete_Access = true;
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                  if (page.pageName === "Designations") {
                    permissions.page_ManageDesignation_Access = true;
                    if (page.listTabMaster && page.listTabMaster.length > 0) {
                      page.listTabMaster.forEach((tabs) => {
                        if (tabs.tabName === "Designations Listing") {
                          permissions.tab_ManageDesignationListing_Access = true;
                          if (
                            tabs.listActionMaster &&
                            tabs.listActionMaster.length > 0
                          ) {
                            tabs.listActionMaster.forEach((actions) => {
                              if (actions.actionName === "Add") {
                                permissions.action_ManageDesignationListing_Add_Access = true;
                              }
                              if (actions.actionName === "Edit") {
                                permissions.action_ManageDesignationListing_Edit_Access = true;
                              }
                              if (actions.actionName === "Delete") {
                                permissions.action_ManageDesignationListing_Delete_Access =
                                  true;
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                  if (page.pageName === "Skills") {
                    permissions.page_ManageSkill_Access = true;
                    if (page.listTabMaster && page.listTabMaster.length > 0) {
                      page.listTabMaster.forEach((tabs) => {
                        if (tabs.tabName === "Skills Listing") {
                          permissions.tab_ManageSkillListing_Access = true;
                          if (
                            tabs.listActionMaster &&
                            tabs.listActionMaster.length > 0
                          ) {
                            tabs.listActionMaster.forEach((actions) => {
                              if (actions.actionName === "Add") {
                                permissions.action_ManageSkillListing_Add_Access = true;
                              }
                              if (actions.actionName === "Edit") {
                                permissions.action_ManageSkillListing_Edit_Access = true;
                              }
                              if (actions.actionName === "Delete") {
                                permissions.action_ManageSkillListing_Delete_Access = true;
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                  if (page.pageName === "Labels") {
                    permissions.page_ManageLabels_Access = true;
                    if (page.listTabMaster && page.listTabMaster.length > 0) {
                      page.listTabMaster.forEach((tabs) => {
                        if (tabs.tabName === "Label Listing") {
                          permissions.tab_ManageLabelsListing_Access = true;
                          if (
                            tabs.listActionMaster &&
                            tabs.listActionMaster.length > 0
                          ) {
                            tabs.listActionMaster.forEach((actions) => {
                              if (actions.actionName === "Add") {
                                permissions.action_ManageLabelsListing_Add_Access = true;
                              }
                              if (actions.actionName === "Edit") {
                                permissions.action_ManageLabelsListing_Edit_Access = true;
                              }
                              if (actions.actionName === "Delete") {
                                permissions.action_ManageLabelsListing_Delete_Access = true;
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                  if (page.pageName === "Channels") {
                    permissions.page_ManageChannels_Access = true;
                    if (page.listTabMaster && page.listTabMaster.length > 0) {
                      page.listTabMaster.forEach((tabs) => {
                        if (tabs.tabName === "Channels Listing") {
                          permissions.tab_ManageChannelsListing_Access = true;
                          if (
                            tabs.listActionMaster &&
                            tabs.listActionMaster.length > 0
                          ) {
                            tabs.listActionMaster.forEach((actions) => {
                              if (actions.actionName === "Add") {
                                permissions.action_ManageChannelsListing_Add_Access = true;
                              }
                              if (actions.actionName === "Edit") {
                                permissions.action_ManageChannelsListing_Edit_Access = true;
                              }
                              if (actions.actionName === "Delete") {
                                permissions.action_ManageChannelsListing_Delete_Access = true;
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                  if (page.pageName === "Head Of Departments") {
                    permissions.page_ManageHeadOfDepartments_Access = true;
                    if (page.listTabMaster && page.listTabMaster.length > 0) {
                      page.listTabMaster.forEach((tabs) => {
                        if (tabs.tabName === "Head Of Departments Listing") {
                          permissions.tab_ManageHeadOfDepartmentsListing_Access = true;
                          if (
                            tabs.listActionMaster &&
                            tabs.listActionMaster.length > 0
                          ) {
                            tabs.listActionMaster.forEach((actions) => {
                              if (actions.actionName === "Add") {
                                permissions.action_ManageHeadOfDepartmentsListing_Add_Access =
                                  true;
                              }
                              if (actions.actionName === "Edit") {
                                permissions.action_ManageHeadOfDepartmentsListing_Edit_Access =
                                  true;
                              }
                              if (actions.actionName === "Delete") {
                                permissions.action_ManageHeadOfDepartmentsListing_Delete_Access =
                                  true;
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                });
              }
            }
            else{
                return state = defaultPermissions;
            }
        case Empty_Master_Permission:
            return state = defaultPermissions;
        default:
            return state;
    }
}

const MasterPermissionApp = combineReducers({
    MasterPermission
});

export default MasterPermissionApp;