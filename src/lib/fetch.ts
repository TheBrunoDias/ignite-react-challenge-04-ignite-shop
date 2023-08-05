export default async function Api<T>(url: string, init?: RequestInit) {
  const baseUrl =
    typeof window === undefined
      ? process.env.NEXT_URL
      : process.env.NEXT_PUBLIC_URL;

  const path = `${baseUrl}/api/${url}`;
  const response = await fetch(path, {
    next: {
      revalidate: 60 * 60,
    },
    ...init,
  });

  const result: T = await response.json();
  return result;
}
