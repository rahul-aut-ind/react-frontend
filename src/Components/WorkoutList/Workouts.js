import React from 'react';

let style = {
    fontSize: 13,
    width: 500
}

function Workouts(props) {
    let badgeClass = 'badge-margin-left-240 badge bg-';
    badgeClass += props.children.isAvailable ? 'success' : 'danger';

    return (
        <li className="list-group-item" style={{backgroundColor: props.children.isAvailable ? 'white' : 'lightgray'}}>
            <h6 className="font-weight-bold mb-2">{props.children.pName}</h6>
            <div className="d-flex">
                <div style={style}>Category: <b>{props.children.category}</b></div>
                <div style={style}>StartDate
                    : <b>{new Date(props.children.startDate).toLocaleString('default', {month: 'long'})}</b></div>
                {props.children.isAvailable ?
                    <button onClick={props.showWorkoutDetails}
                            value={props.children._id}
                            className={badgeClass}>
                        Available to Enroll
                    </button>
                    :
                    <button
                        className={badgeClass} disabled>
                        Unavailable
                    </button>
                }
            </div>
        </li>
    )

}

export default Workouts;