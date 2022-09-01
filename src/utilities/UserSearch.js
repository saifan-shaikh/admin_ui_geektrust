export const userSearch = (value, users) => {
  const searchValue = value.toLowerCase();
  let res = [];
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].name.toLowerCase().includes(searchValue) ||
      users[i].email.toLowerCase().includes(searchValue) ||
      users[i].role.toLowerCase().includes(searchValue)
    ) {
      res.push(users[i]);
    }
  }
  return res;
};
