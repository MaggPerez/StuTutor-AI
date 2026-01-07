import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function GET(request: NextRequest) {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return NextResponse.json(responseData);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}