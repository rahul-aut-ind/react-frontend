import React, {useState} from "react";
import WorkoutForm from "./WorkoutForm";

function CreateWorkout(props) {

    let [showForm, updateShowForm] = useState(false);

    function onCreateWorkout(workout) {
        props.createWorkout(workout);
    }

    function onShowNewWorkoutCreateForm(event) {
        updateShowForm(true);
    }

    function onWorkoutCreatedOrCancelled(event) {
        updateShowForm(false);
    }


    return (<div style={{backgroundColor: "white", padding: '10px 20px', borderRadius: 6}}>
        {!showForm &&
            <button className={"btn btn-warning"}
                    onClick={onShowNewWorkoutCreateForm}>Create Workout</button>
        }
        {showForm &&
            <WorkoutForm createWorkout={onCreateWorkout} onCancel={onWorkoutCreatedOrCancelled}>
            </WorkoutForm>
        }
    </div>);

}


export default CreateWorkout;