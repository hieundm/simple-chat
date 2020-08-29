import React from 'react'
import Content from './ChatBox.Friend.NewRequestContent';
import { Button } from "react-bootstrap";
import { notify, type } from "../../helpers/Toast";

function MainPage() {
    const onClick = () => {
        notify.custom(<Content name="Hieu dep trai" />, {
            autoClose: false,
            type: type.DEFAULT,
            position: "bottom-left",
            hideProgressBar: true
        });
    };

    return (
        <div>
            <Button variant="dark" onClick={onClick}>Test</Button>
        </div>
    )
}

export default MainPage
