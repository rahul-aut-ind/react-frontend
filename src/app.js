import React, {useState, useEffect} from 'react';
import axios from "axios";
import Header from "./Components/Header";
import Login from "./Components/Login/Login";
import PaginatedItems from "./Components/Pagination/Pagination";
import TopBar from "./Components/TopBar";

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

    // const fetchWorkouts = async () => {
    //
    //     const response = await client.get(allWorkoutsEndpoint);
    //     const arrOfWorkouts = response.data.map(workout => {
    //         return workout;
    //     });
    //     return arrOfWorkouts;
    // }

    const allCategories = "All Categories";
    const allDates = "All Dates";
    const [workouts, updateWorkouts] = useState([]);
    const [filteredWorkoutList, updateFilteredWorkoutList] = useState([]);
    const [filterCategory, updateFilterCategory] = useState(allCategories);
    const [filterDate, updateFilterDate] = useState(allDates);
    const [isLoggedIn, setIsLoggedIn] = useState(true || localStorage.getItem("isLoggedIn") === "yes");


    useEffect(() => {
        localStorage.clear();
        getAllWorkouts().then((result) => {
            updateWorkouts(result);
            //localStorage.setItem("WorkoutList", JSON.stringify(workouts));
        });
        // fetchWorkouts().then(result => {
        //     updateWorkoutList(result);
        // })
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


    function updateLoginStatus(value) {
        if (value) {
            localStorage.setItem("isLoggedIn", "yes");
            setIsLoggedIn(value);
        }
    }

    function handleCategoryChange(selectedCategory) {
        //console.log(`Option selected:`, selectedCategory.target.value);
        updateFilterCategory(selectedCategory.target.value);
    };

    // function createWorkoutHandler(newWorkout) {
    //     updateWorkoutList([newWorkout, ...workouts]);
    // }

    function handleDateChange(selectedDate) {
        updateFilterDate(selectedDate.target.value);
    };

    return (
        <>
            {!isLoggedIn && <Login isLoggedIn={updateLoginStatus}/>}
            <Header/>
            <div className={'row'}>
                <TopBar
                    allDates={allDates}
                    allCategories={allCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleDateChange={handleDateChange}
                >
                    {workouts}
                </TopBar>
                <PaginatedItems
                    itemsPerPage={20}
                    workoutList={filteredWorkoutList}
                />
            </div>
        </>
    );
}

export default App;