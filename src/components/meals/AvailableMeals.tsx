import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import NewMenu from "./NewMenu";
import Button from "../UI/Button";
import { mealType } from "../../types/meals";

const AvailableMeals = () => {
  const [dummyMeals, setDummyMeals] = useState<mealType[]>([]);
  const [newMenuIsShown, setNewMenuIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://udemy-food-order-study-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData: mealType[] = await response.json();

      const loadedMeals: mealType[] = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: responseData[key].id,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setDummyMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

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
