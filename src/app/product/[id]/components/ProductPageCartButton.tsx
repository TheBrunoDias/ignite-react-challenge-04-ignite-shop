"use client";

import { Product } from "@/service/product-service";
import { useCart } from "@/store/CartStore";
import { ComponentProps, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

export interface ProductPageCartButtonProps extends ComponentProps<"button"> {
  product: Product;
}

export function ProductPageCartButton({
  product,
  className,
  ...props
}: ProductPageCartButtonProps) {
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
      className={twMerge(
        "flex items-center justify-center rounded-md bg-product-main p-3 text-base font-bold text-white hover:bg-product-light",
        className,
      )}
      {...props}
    >
      {isProductInCart ? <>Remover da Sacola</> : <>Colocar na sacola</>}
    </button>
  );
}
