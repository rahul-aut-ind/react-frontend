import React from 'react';


function TopBar(props) {

    const categories = [], dates = [];
    const month = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    categories.push(props.allCategories);
    dates.push(props.allDates);

    const items = props.children;

    items.forEach((item) => {
        if (!categories.includes(item.category))
            categories.push(item.category);

        // if (!dates.includes(item.date))
        //     dates.push(item.date);
    });
    dates.push(...month);

    return (
        <div className={"d-flex col-lg-8 mx-auto p-2"}>
            {/*<button className={"btn btn-outline-primary"} onClick={props.getAllWorkouts}>Show All Workouts</button>*/}
            <select className={"mx-2"} name="categoryFilter" onChange={props.handleCategoryChange}>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <select className={"mx-2"} name="dateFilter" onChange={props.handleDateChange}>
                {dates.map(date => (
                    <option key={date} value={date}>{date}</option>
                ))}
            </select>
        </div>
    )
}

export default TopBar;