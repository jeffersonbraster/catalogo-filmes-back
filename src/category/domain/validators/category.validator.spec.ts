import CategoryValidatorFactory, {CategoryRules, CategoryValidator} from './category.validator'

describe('categoryValidator Tests', () => {
  let validator: CategoryValidator;

  beforeEach(() => validator = CategoryValidatorFactory.create())
  it('invalidation cases for name filed', () => {
    
    expect({validator, data: {name: null}}).containsErrorMessages({
      name: [
        'name should not be empty',
       'name must be a string',
       'name must be shorter than or equal to 150 characters'
      ]
    })

    expect({validator, data: {name: ''}}).containsErrorMessages({
      name: [
        'name should not be empty',
      ]
    })

    expect({validator, data: {name: 5 as any}}).containsErrorMessages({
      name: [
        'name must be a string',
       'name must be shorter than or equal to 150 characters'
      ]
    })

    expect({validator, data: {name: 't'.repeat(200)}}).containsErrorMessages({
      name: [
       'name must be shorter than or equal to 150 characters'
      ]
    })    
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