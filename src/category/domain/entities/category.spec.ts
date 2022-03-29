import Category from "./category";
import { omit } from "lodash";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id";

describe("Category tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn()
  })
  it("constructor of category", () => {    
    let movie = new Category({
      name: "movie",
    });

    let data = omit(movie.props, "created_at");

    expect(Category.validate).toHaveBeenCalled()

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
    expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
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

  it('should update a category', () => {
    const category = new Category({name: 'movie'})
    category.update('documentary', 'some description');
    expect(Category.validate).toHaveBeenCalledTimes(2)

    expect(category.name).toBe('documentary')
    expect(category.description).toBe('some description')
  })

  it("should active a category", () => {
    const category = new Category({
      name: 'Filmes',
      is_active: false
    })

    category.activate()
    expect(category.is_active).toBeTruthy()

  })

  it("should deactive a category", () => {
    const category = new Category({
      name: 'Filmes',
      is_active: true
    })

    category.deactivate()
    expect(category.is_active).toBeFalsy()

  })
});
