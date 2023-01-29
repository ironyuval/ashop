export const Genres = {
  Action: "action",
  Horror: "horror",
  Comedy: "comedy",
  Sports: "sports",
  SciFi: "scifi",
};

export const Roles = {
  User: "user",
  Admin: "admin",
  Master: "master",
};

export const Permissions = {
  Registered: [Roles.User, Roles.Admin, Roles.Master],
  Admin: [Roles.Admin, Roles.Master],
  Master: [Roles.Master],
};

export const Filters = {
  price: {
    type: "range",
    min: 0,
    max: 100,
  },
  rating: {
    type: "range",
    min: 0,
    max: 5,
  },
  genre: {
    type: "select",
    data: Object.keys(Genres),
  },
};
