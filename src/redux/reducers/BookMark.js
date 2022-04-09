const initialState = {
  listBookMark: [],
};
const bookMarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOOK_MARK': {
      const newListBookMark = [...state.listBookMark];
      newListBookMark.push(action.payload);
      return {
        ...state,
        listBookMark: newListBookMark,
      };
    }
    case 'REMOVE_BOOK_MARK': {
      let newListBookMark = [];
      newListBookMark = state.listBookMark.filter(
        book => book._id !== action.payload,
      );
      return {
        ...state,
        listBookMark: newListBookMark,
      };
    }
    default: {
      return {...state};
    }
  }
};
export {bookMarkReducer};
