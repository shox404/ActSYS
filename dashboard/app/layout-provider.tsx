"use client";

import { store } from "@/store";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import ProtectedRoute from "./protect-route";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider disableTransitionOnChange>
                <header className="h-14 border-b"></header>
                <ProtectedRoute>{children}</ProtectedRoute>
                <Toaster richColors />
                <Analytics debug={false} />
            </ThemeProvider>
        </Provider>
    );
}
