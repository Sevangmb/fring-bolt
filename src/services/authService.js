import db from './db';

const authService = {
  isLoggedIn: async () => {
    const user = await db.getCurrentUser();
    return !!user;
  },
  login: async (user) => {
    const storedUser = await db.getUser(user.username);
    if (storedUser && storedUser.password === user.password) {
      await db.setCurrentUser(user);
      return true;
    }
    return false;
  },
  logout: async () => {
    await db.clearCurrentUser();
  },
  register: async (user) => {
    await db.addUser(user);
    await db.setCurrentUser(user);
  },
};

export default authService;
