import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  defaultPriceId: string;
}

async function getProducts(): Promise<Product[]> {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      description: product.description ?? "",
      imageUrl: product.images[0],
      defaultPriceId: price.id,
      price: price.unit_amount ?? 0,
    };
  });

  return products;
}

async function getProductById(productId: string): Promise<Product> {
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    id: product.id,
    name: product.name,
    description: product.description ?? "",
    imageUrl: product.images[0],
    price: price.unit_amount ?? 0,
    defaultPriceId: price.id,
  };
}

export const productService = {
  getProducts,
  getProductById,
};
