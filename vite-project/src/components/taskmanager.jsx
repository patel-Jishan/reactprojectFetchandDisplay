import { useState } from "react";
import { TaskData } from "./task";

export function Task() {
  let [task, setTask] = useState({ title: "", priority: "", status: false });
  let [status, setStatus] = useState(false);
  let [datapush, setdatapush] = useState(true);
  let [filterdata, setfilterdata] = useState([]);
  let [searchValue, setSearchValue] = useState("");

  function handleChange(e) {
    let { name, value } = e.target;
    setTask({ ...task, [name]: value });
  }

  function handlesubmit(e) {
    e.preventDefault();
    if (!task.title || !task.priority) return alert("Please Fill Task & Priority");
    TaskData.push(task);
    setTask({ title: "", priority: "", status: false });
    setdatapush(!datapush);
    setSearchValue("");
    setfilterdata([]);
  }

  function changeState(idx) {
    let task1 = TaskData.find((v, i) => i === idx);
    task1.status = !task1.status;
    setStatus(!status);
  }

  function deleteData(idx) {
    TaskData.splice(idx, 1);
    setdatapush(!datapush);
  }

  function filtereddata(value) {
    setSearchValue(value);
    let data = TaskData.filter((v) =>
      v.title.toLowerCase().includes(value.toLowerCase())
    );
    setfilterdata([...data]);
  }

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: "Poppins", sans-serif;
          background-color: #f9fafb;
        }
        .main-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%);
          padding: 40px 0;
        }
        .heading {
          text-align: center;
          font-size: 40px;
          color: #34495e;
          margin-bottom: 30px;
        }
        .search-box {
          text-align: center;
          margin-bottom: 25px;
        }
        .search-box input {
          width: 300px;
          padding: 10px 14px;
          border: 2px solid #a0aec0;
          border-radius: 10px;
          outline: none;
          font-size: 16px;
          transition: 0.3s;
        }
        .search-box input:focus {
          border-color: #3498db;
          box-shadow: 0 0 6px rgba(52, 152, 219, 0.4);
        }
        form {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 30px;
        }
        input[type="text"], select {
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
          font-size: 16px;
          width: 220px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.08);
        }
        input[type="submit"] {
          padding: 10px 20px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }
        input[type="submit"]:hover {
          background: #2980b9;
        }
        .task-list {
          width: 70%;
          margin: 0 auto;
        }
        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          padding: 15px 22px;
          margin-bottom: 12px;
          border-radius: 12px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.1);
          transition: 0.3s;
        }
        .task-item:hover {
          transform: scale(1.02);
        }
        .task-title {
          font-size: 20px;
          color: #2c3e50;
          font-weight: 500;
        }
        .priority {
          font-size: 18px;
          font-weight: 600;
        }
        .priority.High {
          color: #e74c3c;
        }
        .priority.Medium {
          color: #f39c12;
        }
        .priority.Low {
          color: #27ae60;
        }
        .btns {
          display: flex;
          gap: 12px;
        }
        .status-btn {
          background-color: #f39c12;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
        }
        .status-btn.completed {
          background-color: #27ae60;
        }
        .delete-btn {
          background-color: #e74c3c;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
        }
        .delete-btn:hover {
          background-color: #c0392b;
        }
        .no-data {
          text-align: center;
          font-size: 20px;
          color: #888;
        }
      `}</style>

      <div className="main-container">
        <h1 className="heading">⚡ Task Manager</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search Task"
            onChange={(e) => filtereddata(e.target.value)}
          />
        </div>

        <form onSubmit={handlesubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Task"
            value={task.title}
            onChange={handleChange}
          />
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="">--Select Priority--</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input type="submit" value="Add Task ➕" />
        </form>

        <div className="task-list">
          {searchValue && filterdata.length === 0 ? (
            <p className="no-data">No Data Found 😴</p>
          ) : (
            (filterdata.length > 0 ? filterdata : TaskData).map((v, i) => (
              <div key={i} className="task-item">
                <div className="task-title">{v.title}</div>
                <div className={`priority ${v.priority}`}>{v.priority}</div>
                <div className="btns">
                  <button
                    className={`status-btn ${v.status ? "completed" : ""}`}
                    onClick={() => changeState(i)}
                  >
                    {v.status ? "Completed" : "Pending"}
                  </button>
                  <button className="delete-btn" onClick={() => deleteData(i)}>
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
