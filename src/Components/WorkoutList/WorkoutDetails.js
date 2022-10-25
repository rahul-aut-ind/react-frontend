import React, {useContext, useReducer, useState} from 'react';
import Button from "./Button";
import WorkoutsContext from "../Context/WorkoutsContext";

let style = {
    padding: '0px 0px',
    fontSize: 15
}

function WorkoutDetails(props) {

    const context = useContext(WorkoutsContext);
    const selectedWorkout = context.selectedWorkout;

    return (
        <>
            <div className="card mb-3" style={{maxWidth: 940}}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={selectedWorkout.image}
                             width="120" height="180"
                             className="card-img"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{selectedWorkout.pName}</h5>
                            <p className="card-text">{selectedWorkout.desc}</p>
                            <div style={style}>Category: <b>{selectedWorkout.category}</b></div>
                            <div style={style}>StartDate
                                : <b>
                                    {new Date(selectedWorkout.date).toLocaleString('default', {month: 'long'})}
                                </b>
                            </div>
                            {/*<p className="card-text">*/}
                            {/*    <small className="text-muted">......*/}
                            {/*    </small>*/}
                            {/*</p>*/}
                        </div>
                    </div>
                </div>
            </div>
            <button className={"btn btn-warning"} onClick={context.onTakeMeBack}>Take me Back</button>
            {/*<div className={"container"}>*/}
            {/*    <button onClick={decrement}>-</button>*/}
            {/*    <span>{state.count}</span>*/}
            {/*    <button onClick={increment}>+</button>*/}
            {/*</div>*/}
        </>
    )
}

export default WorkoutDetails;