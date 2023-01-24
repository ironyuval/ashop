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
  Price: {
    type: "range",
    min: 0,
    max: 100,
  },
  Rating: {
    type: "range",
    min: 0,
    max: 5,
  },
  Genre: {
    type: "select",
    data: Object.keys(Genres),
  },
};
