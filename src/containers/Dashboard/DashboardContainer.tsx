import React, {ReactElement, useState, useEffect} from "react";
import "./dashboard.scss";
import {TopBar} from "../../components/TopBar/TopBar";
import {GeneralInfo} from "../GeneralInfo/GeneralInfo";
import {CurrentBalanceContainer} from "../Balance/CurrentBalanceContainer";
import {BalanceHistoryContainer} from "../Balance/BalanceHistoryContainer";
import {Uptime} from "../Uptime/UptimeContainer";
import {DiskSpace} from "../DiskSpace/DiskSpaceContainer";
import classNames from "classnames";
import {DealsContainer} from "../Deals/DealsContainer";
import {PledgedCollateralContainer} from "../PledgedCollateral/PledgedCollateralContainer";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {getNodeList, getDiskInfoList, getGeneralInfo, getBalanceInfo, getNodeVersion} from "./NodeSlice";
import {logOutUser} from "../../containers/Register/UserSlice";

export const DashboardContainer = (): ReactElement => {
    const [areElementsHidden, setElementsHidden] = useState<boolean>(true);
    const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const nodeList = state.node.nodeList;

    useEffect(() => {
        dispatch(getNodeList());
        dispatch(getNodeVersion());
        if (nodeList[0] && nodeList[0].id) {
            dispatch(getGeneralInfo(nodeList[selectedNodeIndex].id));
            dispatch(getDiskInfoList(nodeList));
            dispatch(getBalanceInfo(nodeList[selectedNodeIndex].id));
            setElementsHidden(false);
        }
    }, [state.node.isLoading, selectedNodeIndex]);

    return (
        <div className="dashboard-container">
            <TopBar logOut={() => dispatch(logOutUser())} email="johndoe@nodefactory.io" />

            <GeneralInfo
                setElementsHidden={setElementsHidden}
                areElementsHidden={areElementsHidden}
                setSelectedNodeIndex={setSelectedNodeIndex}
                selectedNodeIndex={selectedNodeIndex}
            />

            <div className={classNames("splitted-row", {hidden: areElementsHidden})}>
                <div className="column left">
                    <CurrentBalanceContainer balance={state.node.nodeBalance} />
                    <BalanceHistoryContainer />
                </div>
                <div className="column right">
                    <Uptime />
                    <DiskSpace />
                </div>
            </div>

            <div className={classNames("tables", {hidden: areElementsHidden})}>
                <div className="column left">
                    <DealsContainer />
                </div>
                <div className="column right">
                    <PledgedCollateralContainer />
                </div>
            </div>
        </div>
    );
};
