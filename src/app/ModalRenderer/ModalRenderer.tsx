import React, {ReactElement} from "react";
import _ from "lodash";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../rootReducer";
import {ConfirmationDialogContainer} from "../../components/ConfirmationDialog/ConfirmationDialog";
import {removeConfirmationDialog, ModalType} from "./ModalSlice";
import {EditNodeForm} from "../../containers/GeneralInfo/EditNode/EditNodeForm";
import {submitEditNode} from "../../containers/NodeList/NodeListSlice";

export const ModalRenderer: React.FC = (): ReactElement | null => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const selectedNode = _.find(state.nodeList.data, (node: any) => node.id === state.app.selectedNodeId);
    const {type} = state.modal;

    const handleNotificationsSubmit = (): void => {
        dispatch(
            submitEditNode(selectedNode.id, {
                hasEnabledNotifications: !selectedNode.hasEnabledNotifications,
            }),
        );
        dispatch(removeConfirmationDialog());
    };
    const notificationContent = (): string => {
        return selectedNode.hasEnabledNotifications ? "Disable" : "Allow";
    };

    switch (type) {
        case ModalType.EditNode:
            return (
                <ConfirmationDialogContainer title="Edit node" showButtons={false}>
                    <EditNodeForm onSubmit={() => dispatch(removeConfirmationDialog())} />
                </ConfirmationDialogContainer>
            );
        case ModalType.Notifications:
            return (
                <ConfirmationDialogContainer
                    title={`${notificationContent()} notifications`}
                    confirmationButtonLabel={notificationContent()}
                    showButtons={true}
                    onConfirmation={handleNotificationsSubmit}
                    onCancel={() => dispatch(removeConfirmationDialog())}
                >
                    {notificationContent()} notifications on your email from {selectedNode.name}?
                </ConfirmationDialogContainer>
            );
        default:
            return <></>;
    }
};
