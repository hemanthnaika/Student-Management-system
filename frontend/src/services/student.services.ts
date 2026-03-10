import api from "@/lib/axios";
import type { StudentProps } from "@/type";

export const getAllStudents = async () => {
  try {
    const res = await api.get("/students");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch students");
  }
};

export const addStudent = async (student: StudentProps) => {
  try {
    const res = await api.post("/students", student);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add student");
  }
};

export const deleteStudent = async (id: number) => {
  try {
    const res = await api.delete(`/students/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete student");
  }
};

export const updateStudent = async ({
  id,
  student,
}: {
  id: number;
  student: StudentProps;
}) => {
  try {
    const res = await api.put(`/students/${id}`, student);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update student");
  }
};

export const dashboardStats = async () => {
  try {
    const res = await api.get("/dashboard");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
