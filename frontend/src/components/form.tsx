import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface Student {
  id?: number;
  name: string;
  email: string;
  age: number;
  gender: string;
}

interface FormProps {
  title: string;
  icon: LucideIcon;
  onSubmit: (student: Student) => void;
  defaultValues?: Student;
}

const Form = ({ title, icon, onSubmit, defaultValues }: FormProps) => {
  const Icon = icon;

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(defaultValues?.name ?? "");
  const [email, setEmail] = useState(defaultValues?.email ?? "");
  const [age, setAge] = useState(defaultValues?.age?.toString() ?? "");
  const [gender, setGender] = useState(defaultValues?.gender ?? "");

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !age || !gender) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    onSubmit({
      id: defaultValues?.id,
      name,
      email,
      age: Number(age),
      gender,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-medium bg-primary px-3 py-2 rounded-md text-white">
          {title}
          <Icon className="w-4 h-4" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Name */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm font-medium">Age</label>
            <input
              type="number"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md"
          >
            Save Student
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
