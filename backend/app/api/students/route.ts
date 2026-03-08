import { db } from "@/db";
import { studentsTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await db.select().from(studentsTable);

    return NextResponse.json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch students" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, age, gender } = body;

    if (!name || !email || !age || !gender) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    const newStudent = await db
      .insert(studentsTable)
      .values({
        name,
        email,
        age,
        gender,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newStudent[0],
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create student" },
      { status: 500 },
    );
  }
}
