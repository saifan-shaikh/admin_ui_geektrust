import React, { useRef } from "react";
import "./User.css";

const User = (props) => {
  const { user, selectOneUser, editUserDetails, saveUserDetails, deleteUser } =
    props;

  const UserName = useRef(null);
  const UserEmail = useRef(null);
  const UserRole = useRef(null);

  return (
    <tr key={user.id}>
      {/* checkbox */}
      <td>
        <input
          type={"checkbox"}
          checked={user.checked}
          onChange={() => selectOneUser(user.id)}
        />
      </td>
      {/* name */}
      <td>
        <input
          className={!user.edit ? "readonly" : "form-control"}
          type={"text"}
          ref={UserName}
          name="name"
          defaultValue={user.name}
          readOnly={!user.edit}
        />
      </td>
      {/* email */}
      <td>
        <input
          className={!user.edit ? "readonly" : "form-control"}
          type={"email"}
          ref={UserEmail}
          name="email"
          defaultValue={user.email}
          readOnly={!user.edit}
        />
      </td>
      {/* role */}
      <td>
        <input
          className={!user.edit ? "readonly" : "form-control"}
          type={"text"}
          ref={UserRole}
          name="role"
          defaultValue={user.role}
          readOnly={!user.edit}
        />
      </td>
      {/* actions */}
      <td>
        {/* edit and save */}
        {user.edit ? (
          <button
            type="button"
            class="btn btn-info mx-1"
            onClick={() =>
              saveUserDetails(user.id, UserName, UserEmail, UserRole)
            }
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-info mx-1"
            onClick={() => editUserDetails(user.id)}
          >
            Edit
          </button>
        )}
        {/* delete */}
        {!user.edit && (
          <button
            type="button"
            class="btn btn-danger mx-1"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default User;
