import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components'
import * as Bootstrap from 'react-bootstrap';

function Content(props) {
    const onClick = () => window.alert('cc');

    const NewRequest = {
        Wrapper: styled.div`
            display: grid;
            grid-template-columns: max(60px) 1fr;
            align-items: center;
        `,
        Avatar: styled.div`
            width:100%;
        `,
        Content: styled.div`
            padding-left: 10px;
            color: black;
        `
    }

    return (
        <NewRequest.Wrapper onClick={onClick}>
            <NewRequest.Avatar>
                <Bootstrap.Image className="img-fit" roundedCircle src="https://i.pinimg.com/236x/78/99/f5/7899f5988c45d166ba234529ede38754--cartoon-characters-sweet.jpg" />
            </NewRequest.Avatar>
            <NewRequest.Content>
                <b>{props.name}</b> has sent a friend request!
            </NewRequest.Content>
        </NewRequest.Wrapper>
    );
}

Content.propTypes = {
    name: propTypes.string.isRequired
}

export default Content;