import { NextLink } from "@/components/NextLink";
import { ProductCard } from "@/components/ProductCard";
import { ProductSlider } from "@/components/ProductSlider";
import Api from "@/lib/fetch";
import { Product } from "@/service/product-service";
import "keen-slider/keen-slider.min.css";
import Next from "next";

export default async function Home() {
  const products = await Api<Product[]>("products");

  return (
    <>
      <ProductSlider>
        {products.map((product) => (
          <NextLink
            href={`/product/${product.id}`}
            key={product.id}
            className="keen-slider__slide h-full w-full"
          >
            <ProductCard product={product} />
          </NextLink>
        ))}
      </ProductSlider>
    </>
  );
}
