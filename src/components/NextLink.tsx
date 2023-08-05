import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface NextLinkProps extends LinkProps {
  className?: string;
  children: ReactNode;
}

export function NextLink({ className, children, ...props }: NextLinkProps) {
  return (
    <Link
      className={twMerge(
        "text-xl text-product-main hover:text-product-light",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
