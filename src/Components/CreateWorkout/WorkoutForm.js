import React, {useState} from "react";

function WorkoutForm(props) {

    let newWorkout = {
        pName: '',
        pPrice: '',
        pDesc: '',
        pAvailable: false,
        pImageUrl: '',
        pDate: '',
        pCategory: ''
    };

    let [userInput, updateUserInput] = useState(newWorkout);

    function nameInputHandler(event) {
        const newState = {...userInput};
        newState.pName = event.target.value;
        updateUserInput(newState);
    }

    function priceInputHandler(event) {
        //updateUserInput({...userInput, pPrice: event.target.value});
        updateUserInput((prevState) => {
            return {...prevState, pPrice: event.target.value}
        });
    }

    function descriptionInputHandler(event) {
        updateUserInput((prevState) => {
            return {...prevState, pDesc: event.target.value}
        })
        ;
    }

    function availabilityInputHandler(event) {
        updateUserInput((prevState) => {
            return {...prevState, pAvailable: event.target.checked}
        })
        ;
    }

    function imageInputHandler(event) {
        updateUserInput((prevState) => {
            return {...prevState, pImageUrl: event.target.value}
        });
    }

    function categoryInputHandler(event) {
        updateUserInput((prevState) => {
            return {...prevState, pCategory: event.target.value}
        });
    }

    function dateInputHandler(event) {
        updateUserInput((prevState) => {
            return {...prevState, pDate: event.target.value}
        });
    }

    function createWorkoutEventHandler(event) {
        event.preventDefault();
        let workout = {
            pName: userInput.pName,
            desc: userInput.pDesc,
            isAvailable: Boolean(userInput.pAvailable),
            image: userInput.pImageUrl,
            price: Number(userInput.pPrice),
            quantity: 0,
            category: userInput.pCategory,
            date: userInput.pDate
        }
        props.createWorkout(workout);
        props.onCancel();
        updateUserInput(newWorkout);
    }


    return (
        <form className="row g-3" onSubmit={createWorkoutEventHandler}>
            <div className="col-md-6">
                <label htmlFor="name">Workout Name</label>
                <input type="text"
                       className="form-control"
                       id="name"
                       placeholder="Workout Name"
                       value={userInput.pName}
                       onChange={nameInputHandler}/>
            </div>
            <div className="col-md-6">
                <label htmlFor="price">Workout Price</label>
                <input type="number"
                       min="0.01" step="0.01"
                       className="form-control"
                       id="price"
                       placeholder="Workout Price"
                       value={userInput.pPrice}
                       onChange={priceInputHandler}/>
            </div>

            <div className="form-group">
                <label htmlFor="description">Workout Description</label>
                <input type="text"
                       className="form-control"
                       id="description"
                       placeholder="Workout Description"
                       value={userInput.pDesc}
                       onChange={descriptionInputHandler}/>
            </div>

            <div className="col-md-6">
                <label htmlFor="category">Workout Category</label>
                <input type="text"
                       className="form-control"
                       id="category"
                       placeholder="Workout Category"
                       value={userInput.pCategory}
                       onChange={categoryInputHandler}/>
            </div>

            <div className="col-md-6">
                <label htmlFor="date">Workout Availabilty Date</label>
                <input type="text"
                       className="form-control"
                       id="date"
                       placeholder="Workout Availability Date"
                       value={userInput.pDate}
                       onChange={dateInputHandler}/>
            </div>

            <div className="form-check form-switch">
                <input className="form-check-input"
                       type="checkbox"
                       role="switch"
                       id="isAvailable"
                       checked={userInput.pAvailable}
                       onChange={availabilityInputHandler}/>
                <label className="form-check-label" htmlFor="isAvailable">Is workout available in stock?</label>
            </div>

            <div className="form-group">
                <label htmlFor="select-image">Select workout image</label>
                <input type="text"
                       className="form-control"
                       id="select-image"
                       value={userInput.pImageUrl}
                       onChange={imageInputHandler}/>
            </div>

            <button type="submit" className="btn btn-primary">Add Workout</button>
            <button type="button" className="btn btn-danger" onClick={props.onCancel}>Cancel</button>
        </form>)
}

export default WorkoutForm;