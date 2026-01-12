import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000";

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}



/** function to create a user
 * @param request object to create a user with the following fields: id, auth_id, email, full_name, role
 * @returns 
 */
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const response = await fetch(`${API_BASE_URL}/users/create-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: "Failed to create user", details: errorData },
                { status: response.status }
            );
        }

        const responseData = await response.json();
        return NextResponse.json(responseData);
    } catch (error) {
        console.error("Error in POST /api/users:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

