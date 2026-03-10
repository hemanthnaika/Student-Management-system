import { db } from "@/db";
import { studentsTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET() {
  try {
    // TOTAL STUDENTS
    const students = await db.select().from(studentsTable);

    const totalStudents = students.length;

    // GENDER COUNT
    const maleCount = students.filter(
      (s) => s.gender.toLowerCase() === "male",
    ).length;

    const femaleCount = students.filter(
      (s) => s.gender.toLowerCase() === "female",
    ).length;

    return NextResponse.json({
      success: true,
      data: {
        totalStudents,
        genderRatio: {
          male: maleCount,
          female: femaleCount,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
      },
      { status: 500 },
    );
  }
}
