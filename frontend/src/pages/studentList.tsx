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

const students = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", age: 21 },
  { id: 2, name: "Anita Singh", email: "anita@gmail.com", age: 22 },
  { id: 3, name: "Arjun Patel", email: "arjun@gmail.com", age: 20 },
];

const Students = () => {
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
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>

          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white  rounded-xl p-4 shadow-lg">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search students..." className="pl-9 h-10" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white  rounded-xl shadow-lg overflow-hidden p-5">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Age</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">{student.name}</TableCell>

                <TableCell className="text-muted-foreground">
                  {student.email}
                </TableCell>

                <TableCell>{student.age}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 hover:bg-green-50"
                  >
                    <Pencil size={14} className="text-green-600" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 hover:bg-red-50"
                  >
                    <Trash2 size={14} className="text-red-600" />
                    Delete
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
