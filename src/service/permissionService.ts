import {} from "../store/menu";
import { useDispatch, useSelector } from "react-redux";

import { EmptyMasterPermission, FillMasterPermission } from "../store/permissions/master-permission";
import { EmptyEscalationPermission, FillEscalationPermission } from "../store/permissions/escalation-permission";

export class UpdateMenuPermissionService {
  dispatch=useDispatch();
  constructor(menu:any) {
    if(menu.moduleName==='Master Configuration'){
      this.dispatch(EmptyMasterPermission());
      this.dispatch(FillMasterPermission(menu));
    }
     
    if(menu.moduleName==='Escalation'){
      this.dispatch(EmptyEscalationPermission());
        this.dispatch(FillEscalationPermission(menu));
    }
     
  }
}