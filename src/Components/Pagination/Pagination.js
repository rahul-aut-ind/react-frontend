import React, {useContext, useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import WorkoutList from "../WorkoutList/WorkoutList";
import './Pagination.css';
import WorkoutsContext from "../Context/WorkoutsContext";

export default function PaginatedItems() {

    const context = useContext(WorkoutsContext);

    let [pageCount, setPageCount] = useState(0);
    let [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        setPageCount(context.totalPages);
        return () => {
            // cleanup offset whenever filtered list changes
            setItemOffset(0);
        }
    }, [context.filteredWorkouts, context.totalPages])

    // Invoke when user click to request another page.
    function handlePageClick(event) {
        context.onPageChange(event);
    };

    return (
        <>
            <div className={"col-lg-8 mx-auto"}>
                {/*<CreateWorkout createWorkout={createWorkoutHandler}/>*/}
                <WorkoutList/>
            </div>
            {!(pageCount.length === 0) &&
                <div className={"col-lg-8 mx-auto pt-3"}>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="<prev"
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