import { db } from "@/db";
import { studentsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { name, email, age, gender } = body;

    const updatedStudent = await db
      .update(studentsTable)
      .set({
        name,
        email,
        age,
        gender,
      })
      .where(eq(studentsTable.id, Number(params.id)))
      .returning();

    return NextResponse.json({
      success: true,
      data: updatedStudent[0],
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await db
      .delete(studentsTable)
      .where(eq(studentsTable.id, Number(params.id)));

    return NextResponse.json({
      success: true,
      message: "Student deleted",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 },
    );
  }
}
