import Category from "./category";

describe("Category tests", () => {
  it("constructor of category", () => {
    const movie = new Category("movie");

    expect(movie.name).toBe("movie");
  });
});
