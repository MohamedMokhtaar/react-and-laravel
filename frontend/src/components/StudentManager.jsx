import { useState, useEffect } from "react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api";
import toast from "react-hot-toast";


function StudentManager() {
  // State variables
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    tell: "",
    sex: "",
    email: "",
  });

  // Load students on component mount

  useEffect(() => {
    loadStudents();
  }, []);

  // function to load students from API
  const loadStudents = async () => {
    setLoading(true);
    try {
      const response = await getStudents();
      setStudents(response.data.data);
      toast.success("Students loaded successfully");
    } catch (error) {
      console.error("Error loading students:", error);
      toast.error("Error loading students");
    } finally {
      setLoading(false);
    }
  };

  // function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // function to handle form submission for adding a new student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent(formData);
      setFormData({
        name: "",
        tell: "",
        sex: "",
        email: "",
      });
         toast.success(  "Student added successfully");
      loadStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Error adding student");
    }
  };

  // function to handle student deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        loadStudents();
        toast.success("Student deleted successfully");
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Error deleting student");
      }
    }
  };
     if (loading) {
        return <div style={{ padding: '20px' }}>Loading students...</div>;
    }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Manager</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          border: "1px solid #ccc",
          padding: "20px",
        }}
      >
        <h3>Add New Student</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            placeholder="Name"
            required
            style={{ padding: "8px" }}
          />
          <input
            type="text"
            name="tell"
            onChange={handleInputChange}
            value={formData.tell}
            placeholder="Phone"
            required
            style={{ padding: "8px" }}
          />
          <input
            type="text"
            name="sex"
            onChange={handleInputChange}
            value={formData.sex}
            placeholder="Sex"
            required
            style={{ padding: "8px" }}
          />
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            placeholder="Email"
            required
            style={{ padding: "8px" }}
          />
          <button type="submit" style={{ padding: "8px 16px" }}>
            Add Student
          </button>
        </div>
      </form>
      <h1>Student List ({students.length})</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Phone</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Sex</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            return (
              <tr key={student.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.id}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.name}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.tell}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.sex}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.email}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                
                  <button onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentManager;
