import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">
        Welcome To Next Coding and Electronics Guide
      </h1>
      <p className="text-fd-muted-foreground">
        For more information go to{" "}
        <Link href="/docs" className="font-bold text-fd-black underline">
          /docs
        </Link>
      </p>
    </main>
  );
}
