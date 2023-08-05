import { productService } from "@/service/product-service";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  if (!params?.id) {
    throw new Error("Id not Found");
  }

  const result = await productService.getProductById(params.id);

  return NextResponse.json(result);
}
