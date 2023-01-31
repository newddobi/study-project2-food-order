import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useState } from "react";
import AddMenu from "./AddMenu";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "초밥",
    description: "초밥 한 점에 밥알이 몇 개고?",
    price: 22.99,
  },
  {
    id: "m2",
    name: "자장면",
    description: "춘장과 면의 조화로운 하모니",
    price: 16.5,
  },
  {
    id: "m3",
    name: "햄버거",
    description: "맥도날드 vs 버거킹",
    price: 12.99,
  },
  {
    id: "m4",
    name: "샐러드",
    description: "이건 무슨 맛으로 먹는걸까",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [addMenuIsShown, setAddMenuIsShown] = useState(false);

  const showAddMenuHandler = () => {
    setAddMenuIsShown(true);
  };

  const hideAddMenuHandler = () => {
    setAddMenuIsShown(false);
  };

  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  const addMealsClickHandler = () => {
    showAddMenuHandler();
  };

  return (
    <section className={classes.meals}>
      {addMenuIsShown && <AddMenu onClose={hideAddMenuHandler} />}
      <Card>
        <ul>{mealsList}</ul>
      </Card>
      <button onClick={addMealsClickHandler}>음식 추가</button>
    </section>
  );
};

export default AvailableMeals;
