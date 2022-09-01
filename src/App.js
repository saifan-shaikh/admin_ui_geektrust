import React, { useState, useEffect, useRef } from "react";
import { getUsers } from "./utilities/GetUsers";
import { userSearch } from "./utilities/UserSearch";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  //initializing posts
  const [users, setUsers] = useState([]);
  //initializing search list
  const [searchList, setSearchList] = useState([]);
  //initializing currentpage
  const [currentPage, setCurrentPage] = useState(1);
  //initializing posts per page
  const [usersPerPage] = useState(10);
  //initializing force render
  const [forceRender, setForceRender] = useState(false);

  //select all users reference
  const selectAllUsersCheckBox = useRef(null);
  // Get current posts
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // use Effect to retrive all posts on page load
  useEffect(() => {
    getUsers(setUsers, setSearchList);
  }, []);

  //usersearch
  const searchUsers = (e) => {
    setCurrentPage(1);
    setUsers(userSearch(e.target.value, searchList));
  };

  //select all users function
  const selectAllUsers = (e) => {
    let userData = currentUsers;

    if (e.target.checked === true) {
      for (let i = 0; i < userData.length; i++) {
        userData[i].checked = true;
      }
    } else {
      for (let i = 0; i < userData.length; i++) {
        userData[i].checked = false;
      }
    }
    setSearchList(userData);
    setForceRender((prev) => !prev);
  };

  //select one user
  const selectOneUser = (id) => {
    let userData = [...users];
    const idx = userData.findIndex((user) => user.id === id);
    userData[idx].checked = !userData[idx].checked;
    setSearchList(userData);
    setForceRender((prev) => !prev);
  };

  // edit user details
  const editUserDetails = (id) => {
    let userData = [...users];
    const idx = userData.findIndex((user) => user.id === id);
    userData[idx].edit = true;
    setUsers(userData);
    //once deleted, when searched deleted data shouldnot appear
    setSearchList(userData);
    setForceRender((prev) => !prev);
  };

  //save user
  const saveUserDetails = (id, UserName, UserEmail, UserRole) => {
    let userData = [...users];
    const idx = userData.findIndex((user) => user.id === id);
    userData[idx].name = UserName.current.value;
    userData[idx].email = UserEmail.current.value;
    userData[idx].role = UserRole.current.value;
    userData[idx].edit = false;
    setUsers(userData);
    setSearchList(userData);
    setForceRender((prev) => !prev);
  };

  //delete user
  const deleteUser = (id) => {
    if (window.confirm("Do you really want to delete this user??")) {
      const userData = [...users];
      const res = userData.filter((user) => user.id !== id);
      setUsers(res);
      setSearchList(res);
    }
  };

  //delete selected users
  const deleteSelectedUsers = () => {
    if (
      window.confirm("Do you really want to delete all the selected users??")
    ) {
      const userData = [...users];
      const res = userData.filter((user) => user.checked === false);
      selectAllUsersCheckBox.current.checked = false;
      setUsers(res);
      setSearchList(res);
    }
  };
  //paginate function
  const paginate = (pgNum) => {
    setCurrentPage(pgNum);
  };

  //set first page
  const firstPage = () => {
    setCurrentPage(1);
  };

  //set prev page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // set next page
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // set last page
  const lastPage = () => {
    setCurrentPage(Math.ceil(users.length / usersPerPage));
  };
  return (
    <div className="App container">
      {/* searchbar */}
      <input
        type={"search"}
        className="form-control mt-4 mb-5"
        placeholder="Search by name, email or role"
        onChange={(e) => searchUsers(e)}
      />
      {/* usertable */}
      <UserTable
        selectAllUsersCheckBox={selectAllUsersCheckBox}
        selectAllUsers={selectAllUsers}
        users={currentUsers}
        selectOneUser={selectOneUser}
        editUserDetails={editUserDetails}
        saveUserDetails={saveUserDetails}
        deleteUser={deleteUser}
      />
      {/* delete button */}
      <button
        type="button"
        className="btn btn-danger mb-2 d-flex justify-content-start"
        onClick={() => deleteSelectedUsers()}
      >
        Delete Selected
      </button>
      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <Pagination
          postsPerPage={usersPerPage}
          totalPosts={users.length}
          paginate={paginate}
          firstPage={firstPage}
          prevPage={prevPage}
          nextPage={nextPage}
          lastPage={lastPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default App;
