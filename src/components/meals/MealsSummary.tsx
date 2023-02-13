import React from "react";
import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  console.log("MealsSummary");
  return (
    <section className={classes.summary}>
      <h2>맛있는 음식을 배달해드려요 :)</h2>
      <p>
        제공되는 다양한 메뉴 중에서 좋아하는 메뉴를 선택하세요. 집에서 맛있는
        점심 또는 저녁 식사를 즐기십시오.
      </p>
      <p>모든 식사는 고품질 재료로 적시에 조리되며, 물론 숙련된 셰프가!</p>
    </section>
  );
};

export default React.memo(MealsSummary);
