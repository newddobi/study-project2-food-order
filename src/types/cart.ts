export type CartItemType = {
  id: number;
  name: string;
  amount: number;
  price: number;
};

export type CartStoreType = {
  items: CartItemType[];
  totalAmount: number;
};
