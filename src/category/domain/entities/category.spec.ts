import Category from "./category";
import { omit } from "lodash";
import { validate as uuidValidade } from "uuid";

describe("Category tests", () => {
  it("constructor of category", () => {
    let movie = new Category({
      name: "movie",
    });

    let data = omit(movie.props, "created_at");

    expect(data).toStrictEqual({
      name: "movie",
      description: null,
      is_active: true,
    });

    expect(movie.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();

    movie = new Category({
      name: "movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    expect(movie.props).toStrictEqual({
      name: "movie",
      description: "some description",
      is_active: false,
      created_at,
    });
  });

  it("id field", () => {
    const category = new Category({ name: "movie" });

    expect(category.id).not.toBeNull();
    expect(uuidValidade(category.id)).toBeTruthy();
  });

  it("getter of name field", () => {
    const category = new Category({ name: "movie" });

    expect(category.name).toBe("movie");
  });

  it("getter and setter of description field", () => {
    let category = new Category({
      name: "movie",
      description: "some description",
    });

    expect(category.description).toBe("some description");

    category["description"] = "setter description";

    expect(category.description).toBe("setter description");
  });
});
