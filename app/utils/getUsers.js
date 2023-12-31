//Store connected Users
var users = {};

//Funtion to get users online in a room
function getUsers(arr) {
  onlineUsers = [];

  if (arr && arr.length) {
    arr.forEach((onlineUser) => {
      onlineUsers.push(Object.values(onlineUser)[0]);
    });
  }
  return onlineUsers;
}

export { getUsers, users };
