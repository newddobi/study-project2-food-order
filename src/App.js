import { useCallback, useEffect, useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderIsShown, setOrderIsShown] = useState(false);

  // 카트 데이터 불러오기
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  const showCartHandler = useCallback(() => {
    setCartIsShown(true);
  }, []);

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showOrderHandler = useCallback(() => {
    setOrderIsShown(true);
  }, []);

  const hideOrderHandler = () => {
    setOrderIsShown(false);
  };

  return (
    <>
      <Header onShowCart={showCartHandler} onShowOrder={showOrderHandler} />
      <main>
        <Meals />
      </main>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {orderIsShown && <Order onClose={hideOrderHandler} />}
    </>
  );
}

export default App;
