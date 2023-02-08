import { Fragment } from "react";
import HeaderOrderButton from "./HeaderOrderButton";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>민족의 배달</h1>
        <div className={classes["button-group"]}>
          <HeaderOrderButton onClick={props.onShowOrder} />
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
