import { combineReducers } from 'redux';
const Fill_User = 'Fill_User';
const Empty_User = 'Empty_User';

const defaultUser = 
  {
    id: "",
    userName: "",
    password: "",
    employeeInfo: {
        userName: "",
        employeeId: "",
        firstName: "",
        lastName: "",
        middleName: "",
        currentUserName:"",
        departmentId: "",
        managerId: "",
        hodId: "",
        roleId: "",
        slackId: "",
        teamId: "",
        emailId: "",
        businessNumber: "",
        dateOfJoining: "",
        currentTeaure: 0,
        location: "",
        designationId: "",
        countryId: "",
        countryName: "",
        confirmationDate: null,
        tentativeConfirmationDate: null,
        appraisalDueDate: "",
        isUserTeamLead: false,
        isTrackerRequired: false,
        isUserFresher: false
    },
    personalInfo: {
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        maritalStatus: "",
        personalEmailId: "",
        phoneNumber: "",
        profileImagePath: "",
        address1: "",
        address2: "",
        permanentAddress1: "",
        permanentAddress2: "",
        anniversaryDate: null,
        sameAsAddress: false,
        wishMeOn: "",
        emergencyNumber: "",
        spouseName: "",
        spouseDOB: null,
        kids: []
    },
    pastExperince: [],
    documents: [],
    skillsets: [],
    badges: [],
    achievements: [],
    others: [],
    isDeleted: false,
    createdBy: null,
    createdDate: null,
    lastModifiedBy: null,
    token: "",
    typeOfUser: "",
    manager: "",
    department: "",
    role: "",
    designation: "",
    trackerLoginId: ""  
  }

export function FillUser(user) {
  return {
    type: Fill_User,
    user,
  }
}
export function EmptyUser() {
  return {
    type: Empty_User,defaultUser
  }
}

function AuthUser(state=defaultUser, action) {
  switch (action.type) {
    case Fill_User:
        //console.log("action.user",action.user);
        var data=action.user;
        data.employeeInfo.currentUserName=data.employeeInfo.firstName+(data.employeeInfo.lastName!=""?" "+data.employeeInfo.lastName:"")
      return state=data
      case Empty_User:
      return state=defaultUser;
    default:
      return state;
  }
}

const AuthUserApp = combineReducers({
    AuthUser
});

export default AuthUserApp;