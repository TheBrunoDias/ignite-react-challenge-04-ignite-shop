"use client";

import Api from "@/lib/fetch";
import { useCart } from "@/store/CartStore";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Handbag, Spinner, X } from "phosphor-react";
import { useState } from "react";

export function CartDialog() {
  const [loading, setIsLoading] = useState(false);
  const { total, remove, products } = useCart((state) => {
    const { clear, total, remove, products } = state;
    return {
      clear,
      total,
      remove,
      products,
    };
  });

  async function handleGoToCheckout() {
    try {
      setIsLoading(true);
      const line_items = products.map((product) => ({
        price: product.defaultPriceId,
        quantity: 1,
      }));

      const { url } = await Api<{ url: string }>("checkout", {
        method: "POST",
        body: JSON.stringify({ line_items }),
      });

      window.location.href = url;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="relative flex items-center justify-center rounded-md bg-base-gray-2 p-3 text-base-gray-3 hover:text-base-gray-4">
            <Handbag weight="bold" size={32} />
            {products.length > 0 && (
              <span className="absolute right-0 top-0 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border-[3px] border-base-gray-1 bg-product-main text-sm font-bold text-white">
                {products.length}
              </span>
            )}
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/20 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed bottom-0 right-0 top-0 flex w-1/3 flex-col bg-base-gray-2 p-12 data-[state=open]:animate-contentShow">
            <div className="flex w-full items-center justify-end text-base-gray-3">
              <Dialog.Close>
                <X size={24} />
              </Dialog.Close>
            </div>

            <Dialog.Title className="text-lg font-bold text-base-gray-5">
              Sacola de compras
            </Dialog.Title>

            {products.length > 0 && (
              <>
                <div className="mt-8 flex flex-col gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex w-full items-stretch justify-start gap-8"
                    >
                      <div className="flex items-center justify-center rounded-lg bg-product-gradient">
                        <Image
                          src={product.imageUrl}
                          alt=""
                          width={95}
                          height={95}
                        />
                      </div>
                      <div className="flex flex-1 flex-col items-start">
                        <span className="text-base font-normal text-base-gray-4">
                          {product.name}
                        </span>
                        <strong className="text-lg font-bold text-base-gray-5">
                          {new Intl.NumberFormat("pt-br", {
                            currency: "BRL",
                            style: "currency",
                          }).format(product.price / 100)}
                        </strong>
                        <button
                          onClick={() => remove(product)}
                          className="mt-auto font-bold text-product-main hover:text-product-light"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <footer className="mt-auto flex w-full flex-col gap-4">
                  <div className="flex w-full justify-between">
                    <span className="text-base">Quantidade</span>
                    <span className="text-xl">{products.length} Itens</span>
                  </div>

                  <div className="flex w-full justify-between">
                    <span className="text-lg font-bold">Valor Total</span>
                    <span className="text-xl font-bold">
                      {new Intl.NumberFormat("pt-br", {
                        currency: "BRL",
                        style: "currency",
                      }).format(total / 100)}
                    </span>
                  </div>

                  <button
                    onClick={handleGoToCheckout}
                    disabled={loading}
                    className="mt-12 flex items-center justify-center rounded-md bg-product-main px-8 py-5 text-base font-bold text-white enabled:hover:bg-product-light"
                  >
                    {loading ? (
                      <Spinner className="animate-spin" />
                    ) : (
                      <>Finalizar compra</>
                    )}
                  </button>
                </footer>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
