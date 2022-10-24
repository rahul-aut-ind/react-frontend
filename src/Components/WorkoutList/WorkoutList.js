import React from "react";
import Workouts from "./Workouts";

function WorkoutList(props) {

    return props.children.length === 0 ?
        <h3 className={"text-danger"}>No Workouts available matching filter criteria or No workouts available!!</h3>
        :
        (
            <ul className="list-group shadow">
                {props.children.map(workout => (
                    <Workouts
                        key={workout._id}
                        showWorkoutDetails={props.showWorkoutDetails}
                    >
                        {workout}
                    </Workouts>
                ))}
            </ul>
        );

}

export default WorkoutList;