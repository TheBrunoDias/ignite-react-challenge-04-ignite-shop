import Image from "next/image";
import { NextLink } from "./NextLink";
import logo from "@/assets/logo.svg";
import { CartDialog } from "./CartDialog";

export function Header() {
  return (
    <header className="ml-auto flex w-full max-w-container justify-between py-8 pr-32">
      <NextLink href="/">
        <Image src={logo} alt="" />
      </NextLink>

      <CartDialog />
    </header>
  );
}
