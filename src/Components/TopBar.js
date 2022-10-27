import React, {useContext} from 'react';
import WorkoutsContext from "./Context/WorkoutsContext";

function TopBar(props) {

    const context = useContext(WorkoutsContext);

    function handleCategoryChange(selectedValue) {
        context.onCategoryChange(selectedValue);
        context.selectedCategory = selectedValue.target.value;
        // console.log(context);
    }

    function handleDateChange(selectedValue) {
        context.onDateChange(selectedValue);
        context.selectedDate = selectedValue.target.value;
        // console.log(context);
    }

    const categories = [], dates = [];
    categories.push(props.allCategories);

    const items = context.allWorkouts;//props.children;

    items.forEach((item) => {
        if (!categories.includes(item.category))
            categories.push(item.category);

        if (!dates.includes(item.startDate))
            dates.push(item.startDate);
    });

    return (
        <div className={"d-flex p-2 sticky-top bg-secondary col-lg-8 mx-auto"}>
            <select className={"mx-2"} name="categoryFilter" onChange={handleCategoryChange}
                    value={context.selectedCategory ? context.selectedCategory : undefined}>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <select className={"mx-2"} name="dateFilter" onChange={handleDateChange}
                    value={context.selectedDate ? context.selectedDate : undefined}>
                <option key={props.allDates} value={props.allDates}>
                    {props.allDates}
                </option>
                {dates.map(date => (
                    <option key={date} value={date}>
                        {new Date(date).toLocaleString('default', {month: 'long'})}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default TopBar;