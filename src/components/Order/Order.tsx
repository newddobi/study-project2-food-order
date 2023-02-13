import Modal from "../UI/Modal";
import classes from "./Order.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Order: React.FC<{ onClose: () => void }> = (props) => {
  const orders = useSelector((state: RootState) => state.order.orders);
  return (
    <Modal onClose={props.onClose}>
      {orders.map((order) => (
        <div>
          <div>
            <div>{order.user.name}</div>
            <div>{`${order.user.street} ${order.user.city}`}</div>
          </div>
          <div>
            {order.orderedItems.map((item) => (
              <div>
                <div>{`${item.name} ${item.amount}개`}</div>
                <div>{`${item.price * item.amount}원`}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default Order;
