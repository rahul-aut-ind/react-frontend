import React, {useState} from 'react';
import Button from "./Button";

let style = {
    padding: '0px 20px',
    fontSize: 12
}

function WorkoutDetails(props) {

    return (
        <div className="d-flex align-items-center justify-content-start mt-1">
            {/*<h6 className="font-weight-bold my-2" style={{marginRight: 30}}>${props.price}.00</h6>*/}
            {/*<Button doQuantityUpdate={() => handleQuantityDecrease()}*/}
            {/*        disable={productCount === 0 || !props.isAvailable}>-</Button>*/}
            {/*<span style={style}>{displayFormattedProductCount(productCount)}</span>*/}
            {/*<Button doQuantityUpdate={() => handleQuantityIncrease()} disable={!props.isAvailable}>+</Button>*/}
            <div style={style}>Category: <b>{props.category}</b></div>
            <div style={style}>StartDate : <b>{props.date}</b></div>
            <span className={props.badgeClass}>{props.isAvailable ? 'Available to Enroll' : 'Unavailable'}</span>
        </div>
    )
}

export default WorkoutDetails;