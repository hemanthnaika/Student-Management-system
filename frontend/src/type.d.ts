export interface StudentsResponse {
  success: boolean;
  data: Student[];
}

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentProps {
  name: string;
  email: string;
  age: number;
  gender: string;
}

interface RootObject {
  success: boolean;
  data: Data;
}

interface DashboardResponse {
  totalStudents: number;
  genderRatio: GenderRatio;
}

interface GenderRatio {
  male: number;
  female: number;
}
