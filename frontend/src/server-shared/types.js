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

export const FiltersArray = [
  {
    name: "price",
    type: "range",
    min: 0,
    max: 100,
  },
  {
    name: "rating",
    type: "range",
    min: 0,
    max: 5,
  },
  {
    name: "genre",
    type: "select",
    data: Object.keys(Genres),
  },
];
