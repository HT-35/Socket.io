// Đảm bảo bạn đã require uuid trước

// Mảng ban đầu
let userList = [];

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
