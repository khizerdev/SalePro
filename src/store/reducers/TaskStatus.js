const initialState = {
  statuses: [
    {
      id: 1,
      name: "Todo",
    },
    {
      id: 2,
      name: "In Pending",
    },
    {
      id: 3,
      name: "In Development",
    },
    {
      id: 4,
      name: "In QA",
    },
    {
      id: 5,
      name: "Done",
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
