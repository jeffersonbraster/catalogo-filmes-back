import Category from "./category";

describe("Category tests", () => {
  it("constructor of category", () => {
    //triple AAA - arrange act assert

    const created_at = new Date();

    const movie = new Category({
      name: "movie",
      description: "description teste",
      is_active: true,
      created_at,
    });

    expect(movie.props).toStrictEqual({
      name: "movie",
      description: "description teste",
      is_active: true,
      created_at,
    });

    expect(movie.name).toBe("movie");
    expect(movie.description).toBe("description teste");
    expect(movie.is_active).toBeTruthy();
    expect(movie.created_at).toBe(created_at);
  });
});
