let users = [
  { id: "1", name: "Alice Smith", email: "alice@example.com" },
  { id: "2", name: "Bob Johnson", email: "bob@example.com" }
];

export const api = {
  async listUsers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...users]), 300); // Simulate network delay
    });
  },
  async createUser(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: String(users.length + 1), ...userData };
        users.push(newUser);
        resolve(newUser);
      }, 300); // Simulate network delay
    });
  }
};
