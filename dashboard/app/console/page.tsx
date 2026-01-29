"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setUrl, setMapping, setLocalUsers, clearLocalUsers } from "@/store/slices/users";
import { useSaveUsersMutation } from "@/store/apis/users";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/types/users";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { localUsers, mapping, url } = useSelector((state: RootState) => state.users);
    const [saveUsers] = useSaveUsersMutation();
    const [loading, setLoading] = useState(false);

    const handleFetchUsers = async () => {
        if (!url) return alert("Enter a URL");

        setLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (!Array.isArray(data)) throw new Error("URL must return an array");

            const adapted: User[] = data.map((u: any) => ({
                email: u[mapping.email] ?? "",
                name: u[mapping.name] ?? "",
                sub: u[mapping.sub] ?? "",
            }));

            dispatch(setLocalUsers(adapted));
        } catch (err: any) {
            alert("Failed to fetch or map users: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveUsers = async () => {
        if (localUsers.length === 0) return;
        setLoading(true);
        try {
            await saveUsers({ users: localUsers }).unwrap();
            alert("Users saved!");
            dispatch(clearLocalUsers());
        } catch (err) {
            console.error(err);
            alert("Failed to save users");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 flex flex-col gap-6">
            <h1 className="text-3xl">Dashboard</h1>

            <div className="flex flex-col gap-2">
                <Input
                    placeholder="Enter JSON URL"
                    value={url}
                    onChange={(e) => dispatch(setUrl(e.target.value))}
                />

                <div className="grid grid-cols-3 md:grid-cols-3 gap-2">
                    {(["email", "name", "sub"] as const).map((k) => (
                        <Input
                            key={k}
                            placeholder={`Map their key → our ${k}`}
                            value={mapping[k]}
                            onChange={(e) => dispatch(setMapping({ key: k as keyof typeof mapping, value: e.target.value }))}
                        />
                    ))}
                </div>

                <div className="flex gap-2 mt-2">
                    <Button onClick={handleFetchUsers} disabled={loading}>Fetch & Map</Button>
                    <Button onClick={handleSaveUsers} disabled={loading || localUsers.length === 0}>Save All</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {localUsers.map((u: any) => (
                    <Card key={u.sub + u.email}>
                        <CardHeader>
                            <CardTitle>{u.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Email: {u.email}</p>
                            <p>Sub: {u.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
