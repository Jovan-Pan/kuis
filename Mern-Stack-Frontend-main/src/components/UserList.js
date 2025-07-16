import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [filterNo, setFilterNo] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterGender, setFilterGender] = useState("");

  useEffect(() => {
    fetchAndFilterUsers();
  }, [filterNo, filterName, filterEmail, filterGender]);

  const fetchAndFilterUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      let filteredData = response.data;

      if (filterNo) {
        filteredData = filteredData.filter((user, index) =>
          (index + 1).toString().includes(filterNo)
        );
      }
      if (filterName) {
        filteredData = filteredData.filter((user) =>
          user.name.toLowerCase().includes(filterName.toLowerCase())
        );
      }
      if (filterEmail) {
        filteredData = filteredData.filter((user) =>
          user.email.toLowerCase().includes(filterEmail.toLowerCase())
        );
      }
      if (filterGender) {
        filteredData = filteredData.filter((user) =>
          user.gender.toLowerCase().includes(filterGender.toLowerCase())
        );
      }

      setUser(filteredData);
    } catch (error) {
      console.error("Error fetching or filtering users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchAndFilterUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const tableHeaderStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    verticalAlign: "middle",
    paddingBottom: "10px",
  };

  // ----------------------------------------------------
  // IMPORTANT CHANGE HERE: BOLD AND BLACK BORDER
  // ----------------------------------------------------
  const cellBorderStyle = {
    border: "2px solid black", // Changed to 2px solid black for bold and black
  };
  // ----------------------------------------------------

  const filterInputStyle = {
    width: "100%",
    padding: "5px",
    marginTop: "5px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "3px",
  };

  return (
    <div className="columns mt-5">
      <div className="column is-full">
        <Link to="add" className="button is-success mb-3">
          Add New
        </Link>

        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, ...cellBorderStyle }}>No</th>
              <th style={{ ...tableHeaderStyle, ...cellBorderStyle }}>Name</th>
              <th style={{ ...tableHeaderStyle, ...cellBorderStyle }}>Email</th>
              <th style={{ ...tableHeaderStyle, ...cellBorderStyle }}>Gender</th>
              <th style={{ ...tableHeaderStyle, ...cellBorderStyle }}>Actions</th>
            </tr>
            <tr>
              <th style={cellBorderStyle}>
                <input
                  type="text"
                  placeholder="Filter No..."
                  style={filterInputStyle}
                  value={filterNo}
                  onChange={(e) => setFilterNo(e.target.value)}
                />
              </th>
              <th style={cellBorderStyle}>
                <input
                  type="text"
                  placeholder="Filter Name..."
                  style={filterInputStyle}
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </th>
              <th style={cellBorderStyle}>
                <input
                  type="text"
                  placeholder="Filter Email..."
                  style={filterInputStyle}
                  value={filterEmail}
                  onChange={(e) => setFilterEmail(e.target.value)}
                />
              </th>
              <th style={cellBorderStyle}>
                <input
                  type="text"
                  placeholder="Filter Gender..."
                  style={filterInputStyle}
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                />
              </th>
              <th style={cellBorderStyle}></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td style={cellBorderStyle}>{index + 1}</td>
                <td style={cellBorderStyle}>{user.name}</td>
                <td style={cellBorderStyle}>{user.email}</td>
                <td style={cellBorderStyle}>{user.gender}</td>
                <td style={cellBorderStyle}>
                  <Link
                    to={`edit/${user._id}`}
                    className="button is-info is-small mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-danger is-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;