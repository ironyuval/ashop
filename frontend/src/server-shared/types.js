export const Genres = {
  Action: "action",
  Horror: "horror",
  Comedy: "comedy",
  Sports: "sports",
  SciFi: "scifi",
};

//User roles
export const Roles = {
  User: "user",
  Admin: "admin",
  Master: "master",
};

//User roles groups
export const Permissions = {
  Registered: [Roles.User, Roles.Admin, Roles.Master],
  Admin: [Roles.Admin, Roles.Master],
  Master: [Roles.Master],
};

//Product filters
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
