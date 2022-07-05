import Products from "./products.type";

type Order = {
  id: number;
  user_id: number;
  status: string;
  products: Products[];
};

export default Order;
