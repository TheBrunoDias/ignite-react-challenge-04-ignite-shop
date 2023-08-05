import { NextLink } from "@/components/NextLink";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import { redirect } from "next/navigation";
import Stripe from "stripe";
interface SuccessPageProps {
  searchParams: { [key: string]: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect("/");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["customer", "line_items", "line_items.data.price.product"],
  });

  const productsImages = session.line_items?.data.map((i) => {
    const { images } = i.price?.product as Stripe.Product;
    return images[0];
  });

  const clientName = session.customer_details?.name;
  const amount = session.line_items?.data.length;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-2">
      <div className="mb-12 mt-24 flex items-center justify-center -space-x-14">
        {productsImages?.map((image) => (
          <div
            key={image}
            className="flex items-center justify-center rounded-full bg-product-gradient p-2 shadow-card"
          >
            <Image src={image} alt="" width={150} height={150} />
          </div>
        ))}
      </div>

      <strong className="mb-6 text-center text-2xl font-bold text-base-gray-5">
        Compra efetuada!
      </strong>

      <p className="text-center text-xl text-base-gray-4">
        Uhuul <span className="font-bold">{clientName}</span>, sua compra de{" "}
        {amount} camisetas já está a caminho da sua casa.{" "}
      </p>

      <NextLink href="/" className="my-16">
        Voltar ao catálogo
      </NextLink>
    </div>
  );
}
