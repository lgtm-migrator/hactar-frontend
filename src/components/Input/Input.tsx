import React, {ReactElement} from "react";
import classNames from "classnames";

interface IInputContainerProps extends React.HTMLProps<HTMLInputElement> {
    icon?: JSX.Element;
    error?: string;
}

export const Input = (props: IInputContainerProps): ReactElement => {
    const {icon, error} = props;

    // let hasError = error;
    // function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     if (props.error) {
    //         hasError = false;
    //     }
    //     if (props.onChange) {
    //         props.onChange(e);
    //     }
    // }

    return (
        <div className="input-wrapper">
            <div className={classNames("input-container", {"has-icon": !!icon, error})}>
                {icon}
                <input {...props} />
            </div>
            <div className="error-message">{props.error}</div>
        </div>
    );
};
