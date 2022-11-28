import { UsersResponse } from '../types/modalType';

export function filterUsersResponse(res: UsersResponse) {
  const currentUserId = String(localStorage.getItem('id'));
  if (res) {
    return res.find((user) => {
      return user._id === currentUserId;
    });
  }
}

export function filterUsers(users: UsersResponse, inputStr: string) {
  return users.filter((user) => {
    if (user.login.toLowerCase().includes(inputStr.toLowerCase())) {
      return user.login;
    }
  });
}