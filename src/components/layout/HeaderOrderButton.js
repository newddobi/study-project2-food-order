import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./HeaderOrderButton.module.css";
import { orderActions } from "../../store/order";

const HeaderOrderButton = (props) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  // 첫 렌더링 시 주문 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "https://udemy-food-order-study-default-rtdb.firebaseio.com/orders.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      console.log("order response", responseData);

      const loadedOrders = [];

      for (const key in responseData) {
        loadedOrders.push({
          id: responseData[key].id,
          orderedItems: responseData[key].orderedItems,
          user: responseData[key].user,
        });
      }
      dispatch(orderActions.setOrders(loadedOrders));
    };

    fetchOrders();
  }, [dispatch]);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>주문내역</span>
      <span className={classes.badge}>{orders.length}</span>
    </button>
  );
};

export default HeaderOrderButton;
