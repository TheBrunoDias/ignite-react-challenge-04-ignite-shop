import Api from "@/lib/fetch";
import { Product } from "@/service/product-service";
import type { Metadata } from "next";
import Image from "next/image";
import { ProductPageCartButton } from "./components/ProductPageCartButton";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await Api<Product>(`products/${params.id}`);

  return {
    title: product.name,
    description: product.description,
  };
}
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await Api<Product>(`products/${params.id}`);

  return (
    <div className="grid w-full grid-cols-2 items-stretch gap-16">
      <div className="flex w-full items-center justify-center rounded-lg bg-product-gradient">
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl text-base-gray-3">{product.name}</h1>
        <span className="mt-4 block text-2xl text-product-light">
          {new Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(product.price / 100)}
        </span>
        <p className="mt-10 text-base text-base-gray-3">
          {product.description}
        </p>

        <ProductPageCartButton className="mt-auto" product={product} />
      </div>
    </div>
  );
}
