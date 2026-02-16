import { TBook, TBookshelf } from "./types";

// Find books by genre
export const getBooksByGenre = (books: Record<string, TBook>, genreId: string) =>
  Object.values(books).filter(book => book.genreIds.includes(genreId));

// Find books in a shelf
export const getBooksInShelf = (books: Record<string, TBook>, shelf: TBookshelf) =>
  shelf.bookIds.map(id => books[id]).filter(Boolean);

// Toggle read status
export const toggleReadStatus = (book: TBook) => ({
  ...book,
  readByMe: !book.readByMe,
});

// Filter books by multiple genres
export const filterBooksByGenres = (books: Record<string, TBook>, genreIds: string[]) =>
  Object.values(books).filter(book =>
    genreIds.every(id => book.genreIds.includes(id))
  );

// Populate shelf bookIds from genre
export const populateShelfFromGenre = (
  books: Record<string, TBook>,
  shelf: TBookshelf,
  genreId: string
): TBookshelf => ({
  ...shelf,
  bookIds: Object.values(books)
    .filter(b => b.genreIds.includes(genreId))
    .map(b => b.id)
});
