import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "../containers/Register/UserSlice";
import {nodeListReducer} from "../containers/NodeList/NodeListSlice";
import {diskSpaceReducer} from "../containers/DiskSpace/DiskSpaceSlice";
import {balanceReducer} from "../containers/Balance/BalanceSlice";
import {generalInfoReducer} from "../containers/GeneralInfo/GeneralInfoSlice";
import {miningRewardsReducer} from "../containers/MiningRewards/MiningRewardsSlice";
import {appReducer} from "../containers/Dashboard/AppSlice";
import modalReducer from "./ModalRenderer/ModalSlice";

const rootReducer = combineReducers({
    user: userReducer,
    nodeList: nodeListReducer,
    app: appReducer,
    node: combineReducers({
        information: generalInfoReducer,
        balance: balanceReducer,
        miningRewards: miningRewardsReducer,
        diskSpace: diskSpaceReducer,
    }),
    modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
