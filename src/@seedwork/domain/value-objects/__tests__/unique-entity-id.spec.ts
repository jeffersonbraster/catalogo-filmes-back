import InvalidUuidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id";
import { validate as uuidValidade } from "uuid";

describe("uniqueentityid tests", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  beforeEach(() => {
    validateSpy.mockClear();
  });

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id!")).toThrow(
      new InvalidUuidError()
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept uuid passed in constructor", () => {
    const uuid = "ba2e710f-8ac8-477d-81d0-78237fce4b05";
    const vo = new UniqueEntityId(uuid);

    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should validate uuid passed in constructor", () => {
    const vo = new UniqueEntityId();

    expect(uuidValidade(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
