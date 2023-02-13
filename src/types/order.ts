export type menuType = {
  amount: number;
  id: number;
  name: string;
  price: number;
};

export type userType = {
  city: string;
  name: string;
  postalCode: string;
  street: string;
};

export type OrderType = {
  id: number;
  orderedItems: menuType[];
  user: userType;
};

export type OrderStoreType = {
  orders: OrderType[];
};
