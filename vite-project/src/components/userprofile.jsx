import React, { useState, useEffect } from "react";

function UserCard({ name, email, city }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>City:</strong> {city}</p>
    </div>
  );
}

export function UserProfiles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("API request failed");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <>
        <style>
          {`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: 'Poppins', sans-serif;
              background: linear-gradient(270deg, #ff512f, #dd2476, #24c6dc, #514a9d);
              background-size: 600% 600%;
              animation: gradientShift 10s ease infinite;
              height: 100vh;
              overflow: hidden;
            }

            .loading {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              width: 100vw;
              color: white;
              text-align: center;
              perspective: 1000px;
              animation: fadeIn 1.2s ease-in-out;
            }

            .spinner {
              width: 90px;
              height: 90px;
              border-radius: 50%;
              border: 8px solid rgba(255,255,255,0.2);
              border-top: 8px solid #fff;
              animation: spin 1.3s linear infinite;
              box-shadow: 0 0 20px rgba(255,255,255,0.6);
              margin-bottom: 25px;
              transform-style: preserve-3d;
            }

            .loading-text {
              font-size: 24px;
              font-weight: 600;
              letter-spacing: 1.5px;
              text-shadow: 0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6);
              animation: pulse 1.8s ease-in-out infinite;
            }

            @keyframes spin {
              0% { transform: rotateY(0deg) rotate(0deg); }
              100% { transform: rotateY(360deg) rotate(360deg); }
            }

            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.7; transform: scale(1.05); }
            }

            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>

        <div className="loading">
          <div className="spinner"></div>
          <p className="loading-text">⚡ Loading Awesome User Profiles...</p>
        </div>
      </>
    );

  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", fontSize: "18px" }}>
        Error: {error}
      </p>
    );

  
  return (
    <>
      <style>
        {`
          body {
            background: linear-gradient(135deg, #89f7fe, #66a6ff);
            font-family: 'Poppins', sans-serif;
            margin: 0;
          }

          .container {
            padding: 25px;
            max-width: 700px;
            margin: 60px auto;
            background: rgba(255,255,255,0.9);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: fadeIn 1.2s ease-in-out;
            backdrop-filter: blur(8px);
          }

          h1 {
            text-align: center;
            color: #222;
            margin-bottom: 25px;
            font-weight: 700;
            letter-spacing: 1px;
            text-shadow: 0 0 4px rgba(102,166,255,0.4);
          }

          input {
            padding: 12px;
            width: 100%;
            border-radius: 10px;
            border: 2px solid #ccc;
            margin-bottom: 25px;
            font-size: 16px;
            transition: 0.4s;
          }

          input:focus {
            border-color: #007bff;
            box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
            outline: none;
          }

          .card {
            padding: 18px;
            margin: 15px 0;
            border-radius: 12px;
            background: linear-gradient(135deg, #f9f9f9, #f0f0f0);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: all 0.4s ease;
            animation: slideUp 0.6s ease forwards;
          }

          .card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            background: white;
          }

          .card h3 {
            color: #007bff;
            font-size: 20px;
            margin-bottom: 8px;
          }

          .card p {
            color: #555;
            margin: 4px 0;
            font-size: 15px;
          }

          @keyframes slideUp {
            from { transform: translateY(25px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      <div className="container">
        <h1>🌐 User Profiles</h1>
        <input
          type="text"
          placeholder="🔍 Search user by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              email={user.email}
              city={user.address.city}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#777" }}>
            No users found.
          </p>
        )}
      </div>
    </>
  );
}
