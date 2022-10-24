import React from 'react';
import WorkoutDetails from "./WorkoutDetails";

function Workouts(props) {
    let badgeClass = 'badge-margin-left-240 badge bg-';
    badgeClass += props.children.isAvailable ? 'success' : 'danger';

    return (
        <li className="list-group-item" style={{backgroundColor: props.children.isAvailable ? 'white' : 'lightgray'}}>
            <div className="media align-items-lg-center flex-column flex-lg-row p-3 d-flex">
                <div className="media-body order-2 order-lg-1">
                    <h6 className="mt-0 font-weight-bold mb-2">{props.children.pName}</h6>
                    {/*<p className="font-italic text-muted mb-0 small">{props.children.desc}</p>*/}
                    <WorkoutDetails
                        isAvailable={props.children.isAvailable}
                        date={props.children.date}
                        category={props.children.category}
                        badgeClass={badgeClass}
                    />
                </div>
                {/*<img src={props.children.image} alt="Generic placeholder image" width="100" height="100"*/}
                {/*     className="ml-lg-5 order-1 order-lg-2 m-3"/>*/}
            </div>
        </li>
    )

}

export default Workouts;