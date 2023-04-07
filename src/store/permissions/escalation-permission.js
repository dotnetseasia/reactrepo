import { combineReducers } from 'redux';
const Fill_Escalation_Permission = 'Fill_Escalation_Permission';
const Empty_Escalation_Permission = 'Empty_Escalation_Permission';

const defaultPermissions = 
  {
    access: false,
    module_ManageEscalation_Access:false,
  }

export function FillEscalationPermission(module) {
  return {
    type: Fill_Escalation_Permission,
    module,
  }
}
export function EmptyEscalationPermission() {
  return {
    type: Empty_Escalation_Permission,defaultPermissions
  }
}

function EscalationPermission(state = defaultPermissions, action) {
    switch (action.type) {
        case Fill_Escalation_Permission:
            var data = action.module;
            var permissions=defaultPermissions;
            if (data) {
                permissions.access=true;
                permissions.module_ManageEscalation_Access = true;
                return state = permissions;
            }
            else{
                return state = defaultPermissions;
            }
            
        case Empty_Escalation_Permission:
            return state = defaultPermissions;
            
        default:
            return state;
            
    }
}

const EscalationPermissionApp = combineReducers({
    EscalationPermission
});

export default EscalationPermissionApp;