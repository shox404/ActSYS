import { NextRequest, NextResponse } from "next/server";
import { DATABASE_ID, databases, JWT_SECRET, USERS_COLLECTION } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import jwt from "jsonwebtoken";

export async function GET() {
    try {
        const data = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION);
        return NextResponse.json(data.documents, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!Array.isArray(body.users)) {
            return NextResponse.json({ error: "Users must be an array" }, { status: 400 });
        }
        const token = req.cookies.get("auth")?.value;

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const user = jwt.verify(token, JWT_SECRET) as { $id: string };

        const devId = user.$id;
        if (!devId) return NextResponse.json({ error: "dev is required" }, { status: 400 });

        const savedUsers = [];

        for (const u of body.users) {
            if (!u.email || !u.name || !u.sub) continue;

            const doc = await databases.createDocument(
                DATABASE_ID,
                USERS_COLLECTION,
                ID.unique(),
                {
                    email: u.email,
                    name: u.name,
                    sub: u.sub,
                    dev: devId,
                }
            );

            savedUsers.push(doc);
        }

        return NextResponse.json(savedUsers, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
