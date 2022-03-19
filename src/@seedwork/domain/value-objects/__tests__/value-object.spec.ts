import ValueObject from '../value-object'

class StubValueObject extends ValueObject {

}

describe("valueObject unit tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject('string value');
    expect(vo.value).toBe('string value')

    vo = new StubValueObject({pro1: 'value1'});
    expect(vo.value).toStrictEqual({pro1: 'value1'})
  })
})