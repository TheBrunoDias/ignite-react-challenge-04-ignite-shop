"use client";

import { Product } from "@/service/product-service";
import { useCart } from "@/store/CartStore";
import { Handbag, Trash } from "phosphor-react";
import { ComponentProps, MouseEvent } from "react";

export interface ProductCartButtonProps extends ComponentProps<"button"> {
  product: Product;
}

export function ProductCartButton({
  product,
  ...props
}: ProductCartButtonProps) {
  const { add, remove, checkIfProductIsInCart } = useCart((state) => ({
    add: state.add,
    remove: state.remove,
    checkIfProductIsInCart: state.checkIfProductIsInCart,
  }));

  const isProductInCart = checkIfProductIsInCart(product.id);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (isProductInCart) {
      remove(product);
    } else {
      add(product);
    }
    event.preventDefault();
  }

  return (
    <button
      onClick={handleClick}
      title={isProductInCart ? "Remover do Carrinho" : "Adicionar ao Carrinho"}
      className="flex items-center justify-center rounded-md bg-product-main p-3 text-white hover:bg-product-light"
      {...props}
    >
      {isProductInCart ? (
        <Trash weight="bold" size={32} />
      ) : (
        <Handbag weight="bold" size={32} />
      )}
    </button>
  );
}
