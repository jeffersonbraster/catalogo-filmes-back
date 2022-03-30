import ValidatorError from "../../errors/validator-error";
import ValidatorRules from "../validator-rules"

type Values = {
  value: any;
  prop: string;
}

type ExpectedRule = {
  value: any;
  prop: string;
  rule: keyof ValidatorRules;
  error: ValidatorError
  params?: any[]
}

function assertIsInvalid({value, prop, rule, error, params = []}: ExpectedRule){
  expect(() =>{ const validator = ValidatorRules.values(value, prop)
    const method = validator[rule]
    method.apply(validator, params)}).toThrow(error)
}

function assertInValid({value, prop, rule, error, params = []}: ExpectedRule){
  expect(() =>{ const validator = ValidatorRules.values(value, prop)
    const method = validator[rule]
    method.apply(validator, params)}).not.toThrow(error)
}


describe('Validator rules Unit Tests', () => {
  it('values method', () => {
    const validator = ValidatorRules.values("some value", 'field')

    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['prop']).toBe('field');
  })

  it('required validation rule', () => {

    expect(() =>{ ValidatorRules.values(null, 'field').required()}).toThrow(new ValidatorError(`The field is required.`))
    expect(() =>{ ValidatorRules.values(undefined, 'field').required()}).toThrow(new ValidatorError(`The field is required.`))
    expect(() =>{ ValidatorRules.values('', 'field').required()}).toThrow(new ValidatorError(`The field is required.`))

    const arrange: Values[] = [
      {
        value: 'test', prop: 'field', 
      },
      {
        value: 5, prop: 'field', 
      },
      {
        value: false, prop: 'field',
      },
    ]

    arrange.forEach((item) => {
      assertInValid({
        value: item.value,
        prop: item.prop,
        rule: 'required',
        error: new ValidatorError(`The field is required.`)
      })
    })
  })

  it('string validation rule', () => {
    expect(() =>{ ValidatorRules.values(5, 'field').string()}).toThrow(new ValidatorError(`The field must be a string.`))
    expect(() =>{ ValidatorRules.values({}, 'field').string()}).toThrow(new ValidatorError(`The field must be a string.`))
    expect(() =>{ ValidatorRules.values(false, 'field').string()}).toThrow(new ValidatorError(`The field must be a string.`))

    const arrange: Values[] = [
      {
        value: 'test', prop: 'field',
      },
      {
        value: undefined, prop: 'field',
      },
      {
        value: null, prop: 'field',
      },
    ]

    arrange.forEach((item) => {
      assertInValid({
        value: item.value,
        prop: item.prop,
        rule: 'string',
        error: new ValidatorError(`The field must be a string.`)
      })
    })
  })

  it('maxLength validation rule', () => {
    expect(() =>{ ValidatorRules.values('12345', 'field').maxLength(4)}).toThrow(new ValidatorError(`The field must be less or equal than 4 characters.`))

    const arrange: Values[] = [
      {
        value: 'test', prop: 'field', 
      },
      {
        value: undefined, prop: 'field',
      },
      {
        value: null, prop: 'field',
      },
    ]

    arrange.forEach((item) => {
      assertInValid({
        value: item.value,
        prop: item.prop,
        rule: 'maxLength',
        error: new ValidatorError(`The field must be less or equal than 5 characters.`),
        params: [5]
      })
    })
  })

  it("boolean validation rule", () => {
    expect(() =>{ ValidatorRules.values('12345', 'field').boolean()}).toThrow(new ValidatorError(`the field must be a bollean.`))

    const arrange: Values[] = [
      {
        value: false, prop: 'field', 
      },
      {
        value: true, prop: 'field', 
      },
      {
        value: undefined, prop: 'field',
      },
      {
        value: null, prop: 'field',
      },
    ]

    arrange.forEach((item) => {
      assertInValid({
        value: item.value,
        prop: item.prop,
        rule: 'boolean',
        error: new ValidatorError(`the field must be a bollean.`),
      })
    })
  })

  it('should throw validation error when combine two or more validation rules', () => {
    let validator = ValidatorRules.values(null, 'field')
    expect(() => validator.required().string()).toThrow(new ValidatorError(`The field is required.`))

    validator = ValidatorRules.values(5, 'field')
    expect(() => validator.required().string()).toThrow(new ValidatorError(`The field must be a string.`))

    validator = ValidatorRules.values('123456', 'field')
    expect(() => validator.required().maxLength(5)).toThrow(new ValidatorError(`The field must be less or equal than 5 characters.`))

    validator = ValidatorRules.values('123456', 'field')
    expect(() => validator.required().boolean()).toThrow(new ValidatorError(`the field must be a bollean.`))
  })

  it('should valid when combina two or more validation rules', () => {

    expect.assertions(0)
    ValidatorRules.values(null, 'field').string()
    ValidatorRules.values(undefined, 'field').string()
    ValidatorRules.values('test', 'field').required().string()
    ValidatorRules.values(undefined, 'field').string().maxLength(5)
    ValidatorRules.values(null, 'field').string().maxLength(5)
    ValidatorRules.values('12345', 'field').required().string().maxLength(5)

    ValidatorRules.values(null, 'field').boolean()
    ValidatorRules.values(undefined, 'field').boolean()
    ValidatorRules.values(true, 'field').required().boolean()
    ValidatorRules.values(false, 'field').required().boolean()

  })
})