export const users = [
  {
    userId: 1,
    name: "test1",
    email: "test1@gmail.com",
    role: "Admin",
    status: "Active",
    created: "2024-01-01",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    userId: 2,
    name: "test2",
    email: "test2@gmail.com",
    role: "User",
    status: "Inactive",
    created: "2024-02-15",
    image: "",
  },
  {
    userId: 3,
    name: "test3",
    email: "test3@gmail.com",
    role: "User",
    status: "Active",
    created: "2024-03-12",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
  },
  
  {
    userId: 4,
    name: "test4",
    email: "test4@gmail.com",
    role: "Manager",
    status: "Inactive",
    created: "2024-06-10",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
  },
];

export const roles = [
  {
    Id: 1,
    rolename: "Admin",
    description:
      "Has full access to all resources and can manage all users and data.",
    permissions: {
      read: true,
      write: true,
      delete: true,
      manageRoles: true,
      viewAnalytics: true,
    },
  },
  {
    Id: 2,
    rolename: "User",
    description:
      "Can read and write their own data, but cannot modify others' data.",
    permissions: {
      read: true,
      write: false,
      delete: false,
      manageRoles: false,
      viewAnalytics: true,
    },
  },
  {
    Id: 3,
    rolename: "Manager",
    description:
      "Can manage users, assign roles, and view reports, but cannot delete data.",
    permissions: {
      read: true,
      write: true,
      delete: false,
      manageRoles: false,
      viewAnalytics: true,
    },
  },
  
  {
    Id: 4,
    rolename: "Super Admin",
    description:
      "Has the highest level of access, can perform any action across the platform, including system-level management.",
    permissions: {
      read: true,
      write: true,
      delete: false,
      manageRoles: false,
      viewAnalytics: false,
    },
  },
];

export const permissions = [
  {
    id: 1,
    permission: "Read",
    description: "Allows reading of data",
  },
  {
    id: 2,
    permission: "Write",
    description: "Allows writing of data",
  },
  {
    id: 3,
    permission: "Execute",
    description: "Allows execution of operations",
  },
  // {
  //   id: 4,
  //   permission: "Delete",
  //   description: "Allows deletion of records",
  // },
  // {
  //   id: 5,
  //   permission: "Admin",
  //   description: "Full administrative permissions",
  // },
  // {
  //   id: 6,
  //   permission: "View Reports",
  //   description: "Permission to view reports",
  // },
];
