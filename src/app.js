import React, {useState, useEffect, useContext, useReducer} from 'react';
import axios from "axios";
import Header from "./Components/Header";
import PaginatedItems from "./Components/Pagination/Pagination";
import TopBar from "./Components/TopBar";
import WorkoutDetails from "./Components/WorkoutList/WorkoutDetails";
import WorkoutsContext from "./Components/Context/WorkoutsContext";

let workoutsArr = [
    {
        pName: 'D-Workout4',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.',
        isAvailable: true,
        image: 'https://picsum.photos/150/200',
        category: 'Dance',
        date: 'October'
    }
]

function App() {
    const baseURL = "http://localhost:5000";
    const allWorkoutsEndpoint = '/workouts/all';
    const workoutByIdEndpoint = '/workout/';
    const paginatedWorkouts = '/workouts';

    const client = axios.create({
        baseURL: baseURL
    });

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

    function getWorkoutsForPage(pageNo = 1, itemsToDisplay = 20, category = "", startDate = "") {
        // undefined case handling
        category = category ? category : "";
        startDate = startDate ? startDate : "";

        return new Promise((resolve, reject) => {
            client.post(paginatedWorkouts, {
                "category": category,
                "startDate": startDate
            }, {
                params: {
                    pageNo: pageNo,
                    itemsToDisplay: itemsToDisplay
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

    const allCategories = "All Categories";
    const allDates = "All Dates";
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

        getWorkoutsForPage(1, 20, category, startDate).then((result) => {
            updateWorkouts(result.contents);
            setTotalPages(result.totalPages);
        })
        // getAllWorkouts().then((result) => {
        //     updateWorkouts(result);
        //     //localStorage.setItem("WorkoutList", JSON.stringify(workouts));
        // });
    }, []);

    useEffect(() => {
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

        getWorkoutsForPage(pageNo.selected, 20, category, startDate).then((result) => {
            console.log("handlePageChange", result);
            updateFilteredWorkoutList(result.contents);
            setTotalPages(result.totalPages);
        })
    }

    function handleCategoryChange(selectedCategory) {
        updateFilterCategory(selectedCategory.target.value);
    };

    // function createWorkoutHandler(newWorkout) {
    //     updateWorkoutList([newWorkout, ...workouts]);
    // }

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
            itemsToDisplayInPage: 20,
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
                    <PaginatedItems
                        // itemsPerPage={20}
                        //workoutList={filteredWorkoutList}
                        // showWorkoutDetails={showWorkoutDetails}
                    />
                </div>
            }
            {selectedWorkout &&
                <WorkoutDetails/>
            }
        </WorkoutsContext.Provider>
    );
}

export default App;
