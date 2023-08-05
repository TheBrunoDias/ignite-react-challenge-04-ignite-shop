import { productService } from "@/service/product-service";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await productService.getProducts();

  return NextResponse.json(result);
}
