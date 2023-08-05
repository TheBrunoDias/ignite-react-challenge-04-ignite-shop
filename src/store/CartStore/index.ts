import { Product } from "@/service/product-service";
import { create } from "zustand";

export interface CartState {
  products: Product[];
  total: number;

  checkIfProductIsInCart: (productId: string) => boolean;
  load: () => void;
  add: (product: Product) => void;
  remove: (product: Product) => void;
  clear: () => void;
}

export const useCart = create<CartState>((set, get) => {
  function getProductIndexInCart(id: string) {
    const { products } = get();
    return products.findIndex((product) => product.id === id);
  }

  return {
    products: [],
    total: 0,

    checkIfProductIsInCart: (productId) => {
      return getProductIndexInCart(productId) !== -1;
    },
    add: (product) => {
      const { products, total } = get();
      const index = getProductIndexInCart(product.id);
      if (index !== -1) return;

      products.push(product);
      const newTotal = total + product.price;
      set({ products, total: newTotal });
    },
    remove: (product) => {
      const { products, total } = get();
      const index = getProductIndexInCart(product.id);

      if (index === -1) return;
      products.splice(index, 1);

      const newTotal = total - product.price;
      set({ products, total: newTotal });
    },
    clear: () => {
      set({ total: 0, products: [] });
    },
    load: () => {},
  };
});

export const useCartProducts = () => {
  return useCart((state) => {
    const { products, total } = state;
    return { products, total };
  });
};
