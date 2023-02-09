import { useCallback, useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderIsShown, setOrderIsShown] = useState(false);

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
