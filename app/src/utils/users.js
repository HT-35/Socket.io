// Đảm bảo bạn đã require uuid trước

// Mảng ban đầu
let userList = [
  {
    id: "1",
    username: "huy tran",
    room: "fe2",
  },
  {
    id: "2",
    username: "tran huy",
    room: "fe1",
  },
];

// Hàm tạo user
const createUserList = (user) => (userList = [...userList, user]);

const getUserList = (n) => {
  const filterUser = userList.filter((idRoom) => {
    return idRoom.room === n;
  });
  return filterUser.length > 0 ? filterUser : null;
};

module.exports = {
  createUserList,
  getUserList,
};
