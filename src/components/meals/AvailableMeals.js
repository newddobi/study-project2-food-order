import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useState } from "react";
import NewMenu from "./NewMenu";
import DUMMY_MEALS from "./dummy-meals";
import Button from "../UI/Button";

const AvailableMeals = () => {
  const [dummyMeals, setDummyMeals] = useState(DUMMY_MEALS);
  const [newMenuIsShown, setNewMenuIsShown] = useState(false);

  const showNewMenuHandler = () => {
    setNewMenuIsShown(true);
  };

  const hideNewMenuHandler = () => {
    setNewMenuIsShown(false);
  };

  const addNewMenu = (newMenu) => {
    setDummyMeals((prev) => prev.concat(newMenu));
  };

  const mealsList = dummyMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  const addMealsClickHandler = () => {
    showNewMenuHandler();
  };

  return (
    <section className={classes.meals}>
      {newMenuIsShown && (
        <NewMenu onClose={hideNewMenuHandler} onAddClick={addNewMenu} />
      )}
      <Card>
        <ul>{mealsList}</ul>
      </Card>
      <div className={classes.action}>
        <Button onClick={addMealsClickHandler}>메뉴 추가</Button>
      </div>
    </section>
  );
};

export default AvailableMeals;
