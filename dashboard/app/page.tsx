"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="h-56 flex items-center justify-center">
      <Link href="/console">
        <Button>Go to Console</Button>
      </Link>
    </main>
  );
}
