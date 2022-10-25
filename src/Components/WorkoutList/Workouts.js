import React from 'react';
import WorkoutDetails from "./WorkoutDetails";

let style = {
    //padding: '0px 10px',
    fontSize: 13,
    width: 500
}

function Workouts(props) {
    let badgeClass = 'badge-margin-left-240 badge bg-';
    badgeClass += props.children.isAvailable ? 'success' : 'danger';

    return (
        <li className="list-group-item" style={{backgroundColor: props.children.isAvailable ? 'white' : 'lightgray'}}>
            <div className="media align-items-lg-center flex-column flex-lg-row p-1">
                <div className="media-body order-2 order-lg-1">
                    <h6 className="mt-0 font-weight-bold mb-2">{props.children.pName}</h6>
                    <div className="d-flex align-items-center">
                        <div style={style}>Category: <b>{props.children.category}</b></div>
                        <div style={style}>StartDate : <b>{props.children.date}</b></div>
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
                </div>
            </div>
        </li>
    )

}

export default Workouts;