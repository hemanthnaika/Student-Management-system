import Form from "@/components/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Download,
  Pencil,
  PlusCircle,
  Search,
  Trash2,
  User,
} from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "@/services/student.services";

import type { StudentProps, StudentsResponse } from "@/type";
import toast from "react-hot-toast";

import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Students = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const fetchStudents = useQuery<StudentsResponse>({
    queryKey: ["students"],
    queryFn: getAllStudents,
  });

  // SEARCH STUDENTS
  const searchMutation = useMutation({
    mutationFn: async (query: string) => {
      const students = fetchStudents.data?.data || [];

      return students.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.email.toLowerCase().includes(query.toLowerCase()),
      );
    },
  });

  const filteredStudents =
    searchMutation.data || fetchStudents.data?.data || [];

  // ADD STUDENT
  const mutation = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student added successfully");
    },
    onError: () => {
      toast.error("Failed to add student");
    },
  });

  // DELETE STUDENT
  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete student");
    },
  });

  // UPDATE STUDENT
  const updateMutation = useMutation({
    mutationFn: ({ id, student }: { id: number; student: StudentProps }) =>
      updateStudent({ id, student }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student updated successfully");
    },
    onError: () => {
      toast.error("Failed to update student");
    },
  });

  const handleAddStudent = (student: StudentProps) => {
    mutation.mutate(student);
  };

  const handleDeleteStudent = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    deleteMutation.mutate(id);
  };

  const handleUpdateStudent = ({
    id,
    student,
  }: {
    id: number;
    student: StudentProps;
  }) => {
    updateMutation.mutate({ id, student });
  };

  // SEARCH HANDLER
  const handleSearch = (value: string) => {
    setSearch(value);
    searchMutation.mutate(value);
  };

  // EXPORT EXCEL
  const exportExcel = () => {
    if (!filteredStudents.length) {
      toast.error("No data to export");
      return;
    }

    const data = filteredStudents.map((s) => ({
      Name: s.name,
      Email: s.email,
      Age: s.age,
      Gender: s.gender,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "students.xlsx");
  };

  return (
    <div className="p-1 md:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <User className="text-primary w-5 h-5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Students</h2>
            <p className="text-sm text-muted-foreground">
              Manage student records
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={exportExcel}
          >
            <Download className="w-4 h-4" />
            Export
          </Button>

          <Form
            title="Add Student"
            icon={PlusCircle}
            onSubmit={handleAddStudent}
          />
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />

          <Input
            placeholder="Search students..."
            className="pl-9 h-10"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-5">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>

                <TableCell>{student.email}</TableCell>

                <TableCell>{student.age}</TableCell>

                <TableCell>{student.gender}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <Form
                    title=""
                    icon={Pencil}
                    defaultValues={student}
                    onSubmit={(data) =>
                      handleUpdateStudent({
                        id: student.id,
                        student: data,
                      })
                    }
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 hover:bg-red-50"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    <Trash2 size={14} className="text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Students;
