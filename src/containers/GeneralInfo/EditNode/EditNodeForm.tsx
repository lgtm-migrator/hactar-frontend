import React, {ReactElement, useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {Input} from "../../../components/Input/Input";
import {Button} from "../../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/rootReducer";
import {submitEditNode} from "../../../app/ModalRenderer/ModalSlice";

export interface IEditNodeFormData {
    name: string;
    description?: string;
}

interface IEditNodeFormProps {
    // onEditNodeSubmit: (submitData: IEditNodeFormData) => void;
    onCancel: () => void;
    selectedNodeId: number;
}  

export const EditNodeForm: React.FC<IEditNodeFormProps> = ({onCancel, selectedNodeId}: IEditNodeFormProps): ReactElement => {
    const {register, handleSubmit, errors, control} = useForm<IEditNodeFormData>();

    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const onFormSubmit = handleSubmit((submitData: IEditNodeFormData) => {
        console.log(submitData);
        dispatch(submitEditNode(selectedNodeId));
    });

    

    useEffect(()=>{
        register(
            {name: "name"},
            {
                required: "Name is required!",
            },
        );
    },[register])
    return(<>
        <form onSubmit={onFormSubmit}>
            <Controller
                as={Input}
                control={control}
                name="name"
                type="text"
                placeholder="Node name"
                error={errors.name && errors.name.message}
            />
            <Controller
                as={Input}
                control={control}
                name="description"
                type="text"
                placeholder="Description(optional)"
                error={errors.description && errors.description.message}
            />
            <div className="row button-container">
                <Button onClick={onCancel} type="secondary">
                    Cancel
                </Button>
                <Button onClick={onFormSubmit} type="primary">
                    SAVE
                </Button>
            </div>
        </form>
        </>
    );
}