const addFavouriteBook = bookID => {
  return {
    type: 'ADD_BOOK_MARK',
    payload: bookID,
  };
};
const removeFavouriteBook = bookID => {
  return {
    type: 'REMOVE_BOOK_MARK',
    payload: bookID,
  };
};
export {addFavouriteBook, removeFavouriteBook};
