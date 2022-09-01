import axios from "axios";

const getUsers = async (setUsers, setSearchList) => {
  const apiEndPoint =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  try {
    const res = await axios.get(apiEndPoint);
    setUsers(modifiedUserData(res.data));
    setSearchList(modifiedUserData(res.data));
  } catch (error) {
    console.log(error);
  }
};

// modifying user data with some extra flags
const modifiedUserData = (userData) => {
  return userData.map((user) => {
    user.checked = false;
    user.edit = false;

    return user;
  });
};

export { getUsers };
