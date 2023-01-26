export const Genres = {
  Action: "action",
  Horror: "horror",
  Comedy: "comedy",
  Sports: "sports",
  SciFi: "scifi",
};

export const Permissions = {
  Registered: "registered",
  Admin: "admin",
  Master: "master",
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
