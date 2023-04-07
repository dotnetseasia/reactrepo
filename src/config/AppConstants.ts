import * as React from "react";
import * as Icons from "../assests/icons/icons";

export const AppConstants = {
  // Production
  // baseUrl : 'http://seasia.prodacker.com/api/api/',
  // apiFolderPath : "http://seasia.prodacker.com/api/api/FileUploads",

  // Dev Server
  // baseUrl: "http://stg.appsndevs.com/seasiaconnectapi/api/",
  // apiFolderPath: "http://stg.appsndevs.com/seasiaconnectapi/FileUploads",

  // QA Server
  // baseUrl: "http://stg.appsndevs.com/seasiaconnectapiqa/api/",
  // apiFolderPath: "http://stg.appsndevs.com/seasiaconnectapiqa/FileUploads",

  Error_Msg: {
    Unauthorize_Access_Msg:
      "Unauthorize Access !, You didn't have permission to use this screen",
  },
  Redirection: {
    Unauthorize_Access: "/",
  },
  UserType: {
    Admin: "1",
    Manager: "2",
    User: "3",
  },
  Status: {
    Approved: "Approved",
    Rejected: "Rejected",
    Pending: "Pending",
    WrongStatus: "WrongStatus",
    UpdateRequest: "UpdateRequest",
  },
  StatusType: {
    UpdateRequest: "4",
    Approved: "3",
    Rejected: "2",
    Pending: "1",
    WrongStatus: "0",
  },
  LeaveTypeFilter: [
    {
      value: "Select Leave Type",
      label: "Select Leave Type",
    },
    {
      value: "Sick Leave",
      label: "Sick Leave",
    },
    // {
    //   value: "Comp Off Leave",
    //   label: "Comp Off Leave",
    // },
    {
      value: "Casual Leaves",
      label: "Casual Leaves",
    },
    {
      value: "Paternity Leave",
      label: "Paternity Leave",
    },
    {
      value: "Earned Leave",
      label: "Earned Leave",
    },
    {
      value: "Maternity Leave",
      label: "Maternity Leave",
    },
    // {
    //   value: "Other Leaves",
    //   label: "Other Leaves",
    // },
  ],

  LeaveStatus: [
    
    {
      value: 0,
      label: "All Status",
    },
    {
      value: 1,
      label: "Pending",
    },
    {
      value: 2,
      label: "Rejected",
    },
    {
      value: 3,
      label: "Approved",
    },
    {
      value: 4,
      label: "UpdateRequest",
    },
   
  ],

  BrowniePointAssignedToUserStatus: {
    Approved: 1,
    Reject: 2,
    Pending: 3,
  },
  BrowniePointRedeemStatus: {
    Request: 1,
    Paid: 2,
  },
  ScreensIds: {
    Role_Management: "1_1",
    User_Management: "1_2_1",
    Project_Management: "2_1_1",
  },
  ScreenInfo: {
    Role_Management: {
      pageId: "1_1",
      tabId: "1_1_1",
      actionIds: {
        add: "1_1_1_1",
        edit: "1_1_1_2",
        view: "1_1_1_3",
        delete: "1_1_1_4",
      },
    },
    User_Management: {
      pageId: "1_2",
      tabId: "1_2_1",
      actionIds: {
        add: "1_2_1_1",
        edit: "1_2_1_2",
        view: "1_2_1_3",
        delete: "1_2_1_4",
        bulk_import: "1_2_2",
      },
    },

    Master_Configuration: {
      Manage_Department: {
        pageId: "3_1",
        tabId: "3_1_1",
        actionIds: {
          add: "3_1_1_1",
          edit: "3_1_1_2",
          delete: "3_1_1_3",
        },
      },

      Manage_Designation: {
        pageId: "3_2",
        tabId: "3_2_1",
        actionIds: {
          add: "3_2_1_1",
          edit: "3_2_1_2",
          delete: "3_2_1_3",
        },
      },

      Manage_Skill: {
        pageId: "3_3",
        tabId: "3_3_1",
        actionIds: {
          add: "3_3_1_1",
          edit: "3_3_1_2",
          delete: "3_3_1_3",
        },
      },

      Manage_Channel: {
        pageId: "3_6",
        tabId: "3_6_1",
        actionIds: {
          add: "3_6_1_1",
          edit: "3_6_1_2",
          delete: "3_6_1_3",
        },
      },

      Manage_HOD: {
        pageId: "3_4",
        tabId: "3_4_1",
        actionIds: {
          edit: "3_4_1_2",
        },
      },

      Manage_Labels: {
        pageId: "3_5",
        tabId: "3_5_1",
        actionIds: {
          add: "3_5_1_1",
          edit: "3_5_1_2",
          delete: "3_5_1_3",
        },
      },
    },
    Project_Management: "2_1_1",

    Leave_Management: {
      Setup_Leaves: {
        pageId: "5_2",
        tabId: "5_2_1",
        actionIds: {
          add: "5_2_1_1",
          edit: "5_2_1_2",
          delete: "5_2_1_3",
        },
      },
    },

    Brownie_Point: {
      Reasons: {
        pageId: "8_7",
        tabId: "8_7_1",
        actionIds: {
          add: "8_7_1_1",
          edit: "8_7_1_2",
          delete: "8_7_1_3",
        },
      },
    },
  },

  MasterData: {
    Issue: {
      LeaveType: [
        // {
        //   value: "Annual Leaves",
        //   label: "Annual Leaves",
        // },
        {
          value: "Sick Leave",
          label: "Sick Leave",
        },
        // {
        //   value: "Comp Off Leave",
        //   label: "Comp Off Leave",
        // },
        {
          value: "Casual Leaves",
          label: "Casual Leaves",
        },
        {
          value: "Paternity Leave",
          label: "Paternity Leave",
        },
        {
          value: "Earned Leave",
          label: "Earned Leave",
        },
        {
          value: "Maternity Leave",
          label: "Maternity Leave",
        },
        {
          value: "Comp Off Leave",
          label: "Comp Off Leave",
        },
        // {
        //   value: "Other Leaves",
        //   label: "Other Leaves",
        // },
      ],
      LeaveTypehalf: [
        // {
        //   value: "Annual Leaves",
        //   label: "Annual Leaves",
        // },
        {
          value: "Sick Leave",
          label: "Sick Leave",
        },
       
        {
          value: "Casual Leaves",
          label: "Casual Leaves",
        },
        // {
        //   value: "Paternity Leave",
        //   label: "Paternity Leave",
        // },
        // {
        //   value: "Earned Leave",
        //   label: "Earned Leave",
        // },
        // {
        //   value: "Maternity Leave",
        //   label: "Maternity Leave",
        // },
        // {
        //   value: "Other Leaves",
        //   label: "Other Leaves",
        // },
      ],
      LeaveDurationType: [
        {
          value: "1st half",
          label: "1st half",
        },
        {
          value: "2nd half",
          label: "2nd half",
        },
      ],
      Severity: [
        {
          value: "Critical",
          label: "Critical",
        },
        {
          value: "Major",
          label: "Major",
        },
        {
          value: "Medium",
          label: "Medium",
        },
        {
          value: "Low",
          label: "Low",
        },
      ],
      IssueType: [
        {
          value: "Story",
          label: "Story",
          icon: "Icons.Story",
        },
        {
          value: "Bug",
          label: "Bug",
          icon: "Icons.Bug",
        },
        {
          value: "Epic",
          label: "Epic",
          icon: "Icons.Epic",
        },
        {
          value: "Task",
          label: "Task",
          icon: "Icons.Task",
        },
      ],
      Priority: [
        {
          value: "Highest",
          label: "Highest",
          icon: "Icons.Highest",
        },
        {
          value: "High",
          label: "High",
          icon: "Icons.High",
        },
        {
          value: "Medium",
          label: "Medium",
          icon: "Icons.Medium",
        },
        {
          value: "Low",
          label: "Low",
          icon: "Icons.Low",
        },
        {
          value: "Lowest",
          label: "Lowest",
          icon: "Icons.Lowest",
        },
      ],
      LinkedIssue: [
        {
          value: "Blocks",
          label: "Blocks",
        },
        {
          value: "Is Blocked By",
          label: "Is Blocked By",
        },
        {
          value: "Clones",
          label: "Clones",
        },
        {
          value: "Duplicates",
          label: "Duplicates",
        },
        {
          value: "5",
          label: "Is Duplicated By",
        },
        {
          value: "6",
          label: "Relates To",
        },
      ],
      IssueStatus: [
        {
          value: "Product Backlog",
          label: "Product Backlog",
        },
        {
          value: "Sprint Backlog",
          label: "Sprint Backlog",
        },
        {
          value: "In Progress",
          label: "In Progress",
        },
        {
          value: "Review",
          label: "Review",
        },
        {
          value: "Resolved",
          label: "Resolved",
        },
        {
          value: "QA",
          label: "QA",
        },
        {
          value: "QA Failed",
          label: "QA Failed",
        },
        {
          value: "Hold",
          label: "Hold",
        },
        {
          value: "Blocked",
          label: "Blocked",
        },
        {
          value: "Closed",
          label: "Closed",
        },
      ],
      SprintDuration: [
        {
          value: "1 week",
          label: "1 week",
        },
        {
          value: "2 weeks",
          label: "2 weeks",
        },
        {
          value: "3 weeks",
          label: "3 weeks",
        },
        {
          value: "4 weeks",
          label: "4 weeks",
        },
      ],
      LeaveStatus: [
        {
          value: "Approve",
          label: "Approve",
        },
        {
          value: "Reject",
          label: "Reject",
        },
      ],
    },
  },
  EditorSetting: {
    magicUrl: true,
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  },

  MatchRegExp: {
    phoneRegExp:
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([6-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    intRegExp: /^\d+$/,
    alphaNumericWithSpace: /^[0-9a-zA-Z ]+$/,
    alphaNumeric: /^([A-Za-z\s]*)$/g,
    MobileNumber:
     /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6-9]\d{9}|(\d[ -]?){10}\d$/,
    alpha: /^[A-Za-z\s\-]+$/,
  },
};
export default AppConstants;
