import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Fetch data on load (GET)
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  // ✅ Submit data (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!name || !email) {
      setMessage("❌ Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message}`);
      } else {
        setMessage("✅ User added successfully");
        setUsers([...users, data.user]); // live update
        setName("");
        setEmail("");

        setTimeout(() => setMessage(""), 3000);
        
      }
    } catch (error) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>User Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <button type="submit">Add User</button>
      </form>

      <p>{message}</p>

      <hr />

      <h3>Users List</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
