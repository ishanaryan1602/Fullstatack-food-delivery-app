// import React, { useContext } from 'react'
// import './FoodDisplay.css'
// import { StoreContext } from '../../Context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem';

// const FoodDisplay = ({ category }) => {

//     const { food_list } = useContext(StoreContext);

//     return (
//         <div className='food-display' id='food-display'>
//             <h2>Top dishes near you</h2>
//             <div className="food-display-list">
//                 {
//                     food_list.map((item, index) => {
//                         if(category==="All" || category === item.category)
//                         {return <FoodItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} description={item.description} />}
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

// export default FoodDisplay


import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    const filteredFoodList = category === "All" ? food_list : food_list.filter(item => item.category === category);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {filteredFoodList?.map(item => (<FoodItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} description={item.description} />))}
            </div>
        </div>
    );
};

export default FoodDisplay;
