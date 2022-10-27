import React, {useContext} from "react";
import Workouts from "./Workouts";
import WorkoutsContext from "../Context/WorkoutsContext";

function WorkoutList() {

    const context = useContext(WorkoutsContext);

    return context.filteredWorkouts.length === 0 ?
        <h3 className={"text-danger"}>No Workouts available matching filter criteria or No workouts available!!</h3>
        :
        (
            <ul className="list-group shadow">
                {context.filteredWorkouts.map(workout => (
                    <Workouts
                        key={workout._id}
                        showWorkoutDetails={context.onShowWorkoutDetails}
                    >
                        {workout}
                    </Workouts>
                ))}
            </ul>
        );

}

export default WorkoutList;