import Modal from "../UI/Modal";
import classes from "./Order.module.css";
import { useSelector } from "react-redux";

const Order = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const makeKoreaCurrency = (price, amount) => {
    const totalPrice = price * amount;
    return totalPrice.toLocaleString();
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={classes["order-box"]}>
        {orders.map((order) => (
          <div key={order.id} className={classes.order}>
            <div className={classes["user-info"]}>
              <div className={classes.title}>배달주소</div>
              <div className={classes.content}>
                받으시는 분 : {order.user.name}
              </div>
              <div
                className={classes.content}
              >{`${order.user.street} ${order.user.city}`}</div>
            </div>
            <div className={classes["menu-box"]}>
              {order.orderedItems.map((item, index) => (
                <div key={index}>
                  <div>{`${item.name} ${item.amount}개`}</div>
                  <div>{`${makeKoreaCurrency(item.price, item.amount)}원`}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default Order;
