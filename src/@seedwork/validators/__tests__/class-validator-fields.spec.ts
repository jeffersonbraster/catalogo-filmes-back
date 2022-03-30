import ClassValidatorFields from '../class-validator-fields'
import * as libClassValidator from 'class-validator'
class StubClassValidatorFields extends ClassValidatorFields<{field: string}> {

}

describe('class validator fields unit tests', () => {
  it('should initialize errors and validated data variables with null', () => {
    const validator = new StubClassValidatorFields();

    expect(validator.errors).toBeNull()
    expect(validator.validatedData).toBeNull()
  })

  it('should validate with errors', () => {
    const spy = jest.spyOn(libClassValidator, 'validateSync')

    spy.mockReturnValue([
      {property: 'field', constraints: {isRequired: 'some error'}}
    ]);

    const validator = new StubClassValidatorFields();

    expect(validator.validate(null)).toBeFalsy();
    expect(spy).toBeCalled();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({field: ['some error']});

  })

  it('should validate without errors', () => {
    const spy = jest.spyOn(libClassValidator, 'validateSync')

    spy.mockReturnValue([]);

    const validator = new StubClassValidatorFields();

    expect(validator.validate({field: 'value'})).toBeTruthy();
    expect(spy).toBeCalled();
    expect(validator.validatedData).toStrictEqual({field: 'value'});
    expect(validator.errors).toBeNull();

  })
})