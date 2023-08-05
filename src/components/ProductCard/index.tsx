import { Product } from "@/service/product-service";
import Image from "next/image";
import { ProductCartButton } from "./ProductCartButton";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex h-full items-center justify-center overflow-hidden rounded-lg bg-product-gradient">
      <Image
        src={product.imageUrl}
        alt=""
        className="object-cover"
        width={520}
        height={520}
      />

      <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded bg-black/60 p-8 opacity-0 duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex flex-col">
          <strong className="text-lg text-base-gray-5">{product.name}</strong>
          <span className="text-xl font-bold text-product-light">
            {new Intl.NumberFormat("pt-br", {
              currency: "BRL",
              style: "currency",
            }).format(product.price / 100)}
          </span>
        </div>
        <ProductCartButton product={product} />
      </footer>
    </div>
  );
}
