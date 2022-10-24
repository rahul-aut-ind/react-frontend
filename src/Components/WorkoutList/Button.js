import React from 'react';

function Button(props) {
    return (
        <button className={"btn btn-primary"}
                onClick={() => props.doQuantityUpdate()}
                disabled={props.disable}
        >{props.children}
        </button>
    )
}

export default Button;