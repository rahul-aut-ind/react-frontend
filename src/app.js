import React, {useState, useEffect, useContext, useReducer} from 'react';
import axios from "axios";
import Header from "./Components/Header";
import PaginatedItems from "./Components/Pagination/Pagination";
import TopBar from "./Components/TopBar";
import WorkoutDetails from "./Components/WorkoutList/WorkoutDetails";
import WorkoutsContext from "./Components/Context/WorkoutsContext";

function App() {
    const baseURL = "http://localhost:5000";
    const allWorkoutsEndpoint = '/workouts/all';
    const workoutByIdEndpoint = '/workout/';
    const paginatedWorkouts = '/workouts';

    const ITEMS_PER_PAGE = 20;

    const client = axios.create({
        baseURL: baseURL
    });

    // deprecated as per feedback of handling pagination on server side instead of client side
    function getAllWorkouts() {
        return new Promise((resolve, reject) => {
            client.get(allWorkoutsEndpoint).then(function (response) {
                // console.log("Api Response>\n" + response.data);
                resolve(response.data);
            })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                })
        });
    }

    // Get details of a single workout
    function getWorkoutById(workoutId) {
        return new Promise((resolve, reject) => {
            client.get(workoutByIdEndpoint + workoutId).then(function (response) {
                resolve(response.data);
            })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                })
        });
    }

    // Get List of Workouts in a paginated manner
    function getWorkoutsForPage(pageNo = 1, itemsToDisplay = ITEMS_PER_PAGE, category = "", startDate = "") {
        // undefined case handling
        category = category ? category : "";
        startDate = startDate ? startDate : "";

        return new Promise((resolve, reject) => {
            client.get(paginatedWorkouts, {
                params: {
                    pageNo: pageNo,
                    itemsToDisplay: itemsToDisplay,
                    category: category,
                    startDate: startDate
                }
            }).then(function (response) {
                resolve(response.data);
            })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                })
        });
    }

    // declaration for Filter Default Values
    const allCategories = "All Categories";
    const allDates = "All Dates";

    // Declaring the states used throughout the app
    const [workouts, updateWorkouts] = useState([]);
    const [filteredWorkoutList, updateFilteredWorkoutList] = useState([]);
    const [filterCategory, updateFilterCategory] = useState(allCategories);
    const [filterDate, updateFilterDate] = useState(allDates);
    const [selectedWorkout, updateSelectedWorkout] = useState(null);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        localStorage.clear();
        let category = (filterCategory === allCategories) ? "" : filterCategory;
        let startDate = (filterDate === allDates) ? "" : filterDate;

        getWorkoutsForPage(1, ITEMS_PER_PAGE, category, startDate).then((result) => {
            updateWorkouts(result.contents);
            setTotalPages(result.totalPages);
        })
    }, []);

    useEffect(() => {

        let category = (filterCategory === allCategories) ? "" : filterCategory;
        let startDate = (filterDate === allDates) ? "" : filterDate;

        getWorkoutsForPage(1, ITEMS_PER_PAGE, category, startDate).then((result) => {
            updateFilteredWorkoutList(result.contents);
            setTotalPages(result.totalPages);
        })

        let tempFilteredWorkoutList = workouts.filter((workout) => {
            if (filterCategory === allCategories)
                return workout;
            else
                return workout.category === filterCategory;
        }).filter((workout) => {
            if (filterDate === allDates)
                return workout;
            else
                return workout.date === filterDate;
        });
        updateFilteredWorkoutList(tempFilteredWorkoutList);
    }, [workouts, filterCategory, filterDate]);

    function handlePageChange(pageNo) {
        let category = (filterCategory === allCategories) ? "" : filterCategory;
        let startDate = (filterDate === allDates) ? "" : filterDate;

        getWorkoutsForPage(pageNo.selected, ITEMS_PER_PAGE, category, startDate).then((result) => {
            updateFilteredWorkoutList(result.contents);
            setTotalPages(result.totalPages);
        })
    }

    function handleCategoryChange(selectedCategory) {
        updateFilterCategory(selectedCategory.target.value);
    };

    function handleDateChange(selectedDate) {
        updateFilterDate(selectedDate.target.value);
    };

    function showWorkoutDetails(selectedWorkout) {
        const workoutID = selectedWorkout.target.value;
        getWorkoutById(workoutID).then((result) => {
            updateSelectedWorkout(result);
        });
    }

    function takeMeBack() {
        updateSelectedWorkout(null);
    }

    return (
        <WorkoutsContext.Provider value={{
            onCategoryChange: handleCategoryChange,
            onDateChange: handleDateChange,
            onShowWorkoutDetails: showWorkoutDetails,
            onTakeMeBack: takeMeBack,
            onPageChange: handlePageChange,
            totalPages: totalPages,
            itemsToDisplayInPage: ITEMS_PER_PAGE,
            selectedDate: filterDate,
            selectedCategory: filterCategory,
            selectedWorkout: selectedWorkout,
            allWorkouts: workouts,
            filteredWorkouts: filteredWorkoutList
        }}>
            <Header/>
            {!selectedWorkout &&
                <div>
                    <TopBar
                        allDates={allDates}
                        allCategories={allCategories}
                    >
                    </TopBar>
                    <PaginatedItems/>
                </div>
            }
            {selectedWorkout &&
                <WorkoutDetails/>
            }
        </WorkoutsContext.Provider>
    );
}

export default App;
