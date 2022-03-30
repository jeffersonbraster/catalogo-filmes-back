import CategoryValidatorFactory, {CategoryRules, CategoryValidator} from './category.validator'

describe('categoryValidator Tests', () => {
  let validator: CategoryValidator;

  beforeEach(() => validator = CategoryValidatorFactory.create())
  it('invalidation cases for name filed', () => {
    let isValid = validator.validate(null)

    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 150 characters'
    ])

    isValid = validator.validate({name: ''})

    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name should not be empty',
    ])

    isValid = validator.validate({name: 5 as any})

    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name must be a string',
      'name must be shorter than or equal to 150 characters'
    ])

    isValid = validator.validate({name: 't'.repeat(200)})

    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 150 characters'
    ])
  })

  it('valid cases for fields', () => {
    let isValid = validator.validate({name: 'some value'});

    expect(isValid).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(new CategoryRules({name: 'some value'}))

    isValid = validator.validate({name: 'some value', description: 'some description'});
    expect(isValid).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(new CategoryRules({name: 'some value', description: 'some description'}))
    
    isValid = validator.validate({name: 'some value', description: null});
    expect(isValid).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(new CategoryRules({name: 'some value', description: null}))
    
    isValid = validator.validate({name: 'some value', description: undefined});
    expect(isValid).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(new CategoryRules({name: 'some value', description: undefined}))
    
    isValid = validator.validate({name: 'some value', is_active: false});
    expect(isValid).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(new CategoryRules({name: 'some value', is_active: false}))

    isValid = validator.validate({name: 'some value', is_active: true});
    expect(isValid).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(new CategoryRules({name: 'some value', is_active: true}))
  })
})