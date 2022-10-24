import React, {useState} from 'react';
import Button from "./Button";

let style = {
    padding: '0px 0px',
    fontSize: 15
}

function WorkoutDetails(props) {

    return (
        <>
            <div className="card mb-3" style={{maxWidth: 940}}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={props.children.image}
                             width="120" height="180"
                             className="card-img"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.children.pName}</h5>
                            <p className="card-text">{props.children.desc}</p>
                            <div style={style}>Category: <b>{props.children.category}</b></div>
                            <div style={style}>StartDate : <b>{props.children.date}</b></div>
                            <p className="card-text"><small className="text-muted">

                            </small></p>
                        </div>
                    </div>
                </div>
            </div>
            <button className={"btn btn-warning"} onClick={props.takeMeBack}>Take me Back</button>
        </>
    )
}

export default WorkoutDetails;