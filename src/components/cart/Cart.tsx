import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import { orderActions } from "../../store/order";
import { useState } from "react";
import Checkout from "./Checkout";
import { CartItemType } from "../../types/cart";
import { RootState } from "../../store";
import { userType } from "../../types/order";

const Cart: React.FC<{ onClose: () => void }> = (props) => {
  const dispatch = useDispatch();
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);

  const items: CartItemType[] = useSelector(
    (state: RootState) => state.cart.items
  );
  const totalAmount: number = useSelector(
    (state: RootState) => state.cart.totalAmount
  );

  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id: number) => {
    dispatch(cartActions.removeItem({ id }));
  };

  const cartItemAddHandler = (item: CartItemType) => {
    dispatch(
      cartActions.addItem({
        ...item,
        amount: 1,
      })
    );
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData: userType) => {
    setIsSubmitting(true);

    const newOrder = {
      id: new Date().getTime(),
      user: userData,
      orderedItems: items,
    };

    await fetch(
      "https://udemy-food-order-study-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(newOrder),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(orderActions.addOrder(newOrder));
    dispatch(cartActions.clearCart());
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
