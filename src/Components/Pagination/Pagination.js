import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import WorkoutList from "../WorkoutList/WorkoutList";
import './Pagination.css';

export default function PaginatedItems(props) {

    let [currentWorkoutDisplayItems, setCurrentWorkoutDisplayItems] = useState(props.workoutList);
    let [pageCount, setPageCount] = useState(0);
    let [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        setCurrentWorkoutDisplayItems(props.workoutList);

        return ()=>{
            // cleanup offset whenever filtered list changes
            setItemOffset(0);
        }
    }, [props.workoutList])


    useEffect(() => {
        const endOffset = itemOffset + props.itemsPerPage;
        setCurrentWorkoutDisplayItems(props.workoutList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(props.workoutList.length / props.itemsPerPage));
        //console.log("Current Items > " + JSON.stringify(currentWorkoutDisplayItems));
    }, [itemOffset, props.itemsPerPage, props.workoutList]);


    // Invoke when user click to request another page.
    function handlePageClick(event) {
        // console.log(event.selected);
        const newOffset = (event.selected * props.itemsPerPage) % props.workoutList.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };


    return (
        <>
            <div className={"col-lg-8 mx-auto"}>
                {/*<CreateWorkout createWorkout={createWorkoutHandler}/>*/}
                <WorkoutList showWorkoutDetails={props.showWorkoutDetails}
                >
                    {currentWorkoutDisplayItems}
                </WorkoutList>
            </div>
            {props.workoutList.length > Number(props.itemsPerPage) &&
                <div className={"col-lg-8 mx-auto pt-3"}>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="<prev"
                        //renderOnZeroPageCount={null}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
            }
        </>
    );
}