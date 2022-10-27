import React from "react";

let WorkoutsContext = React.createContext({
    onCategoryChange: undefined,
    onDateChange: undefined,
    onShowWorkoutDetails: undefined,
    onTakeMeBack: undefined,

    selectedCategory: undefined,
    selectedDate: undefined,
    itemsToDisplayInPage: undefined,
    totalPages: undefined,

    selectedWorkout: undefined,
    allWorkouts: [],
    filteredWorkouts: []
});

export default WorkoutsContext;