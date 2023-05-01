const filterBooks = (booksThatWillBeFiltered, filters) => {
  const result = [];

  result.push(
    booksThatWillBeFiltered.filter((book) => {
      const genreMatch =
        filters.genre === "any" || book.genres.includes(filters.genre);
      console.log(genreMatch);

      return (
        (filters.title.trim() === "" ||
          book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === "any" || book.author === filters.author) &&
        genreMatch
      );
    })
  );

  return result;
};

export default filterBooks;
