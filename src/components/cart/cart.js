import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import { orderActions } from "../../store/order";
import { useState } from "react";
import Checkout from "./Checkout";

const Cart = (props) => {
  const dispatch = useDispatch();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItemFromCart({ id }));
  };

  const cartItemAddHandler = (item) => {
    dispatch(
      cartActions.addItemToCart({
        ...item,
        amount: 1,
      })
    );
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
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
        닫기
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          주소입력
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>총 결제금액</span>
        <span>{totalAmount.toLocaleString()}원</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>주문중입니다.</p>;

  const didSubmitModalContent = (
    <>
      <p>빠르게 배달해드릴께요, 조금만 기다려주세요</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          닫기
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
