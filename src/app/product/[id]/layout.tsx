import { Suspense } from "react";
import Loading from "./loading";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="ml-auto flex min-h-[656px] w-full max-w-container pr-32">
        {children}
      </div>
    </Suspense>
  );
}
