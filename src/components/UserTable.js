import React from "react";
import User from "./User";

const UserTable = (props) => {
  const {
    selectAllUsersCheckBox,
    selectAllUsers,
    users,
    selectOneUser,
    editUserDetails,
    saveUserDetails,
    deleteUser,
  } = props;
  return (
    <div>
      <table class="table table-hover ">
        <thead>
          <tr>
            {/* select all input */}
            <th scope="col">
              <input
                type={"checkbox"}
                ref={selectAllUsersCheckBox}
                name="selectAllUsersCheckBox"
                onChange={(e) => {
                  selectAllUsers(e);
                }}
              />
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {/* body of table */}
        <tbody className="table-group-divider">
          {users.map((user) => {
            return (
              <User
                user={user}
                selectOneUser={selectOneUser}
                editUserDetails={editUserDetails}
                saveUserDetails={saveUserDetails}
                deleteUser={deleteUser}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
