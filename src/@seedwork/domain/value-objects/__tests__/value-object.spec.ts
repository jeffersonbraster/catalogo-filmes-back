import ValueObject from "../value-object";

class StubValueObject extends ValueObject {}

describe("valueObject unit tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ pro1: "value1" });
    expect(vo.value).toStrictEqual({ pro1: "value1" });
  });

  it("should convert to a string", () => {
    const date = new Date();
    let arrange = [
      { received: null, expected: "null" },
      { received: undefined, expected: "undefined" },
      { received: "", expected: "" },
      { received: "fake test", expected: "fake test" },
      { received: 0, expected: "0" },
      { received: true, expected: "true" },
      { received: date, expected: date.toString() },
      {
        received: { prop1: "test" },
        expected: JSON.stringify({ prop1: "test" }),
      },
    ];

    arrange.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(vo + "").toBe(value.expected);
    });
  });
});
