import ValidatorError from "../../../@seedwork/errors/validator-error"
import Category from "./category"


describe('category integration teste', () => {

  describe('create method', () => {
    it('should a invalid category using name property', () => {
      expect(() => new Category({name: null})).toThrow(
        new ValidatorError('The name is required.')
      )
  
      expect(() => new Category({name: ''})).toThrow(
        new ValidatorError('The name is required.')
      )
  
      expect(() => new Category({name: 5 as any})).toThrow(
        new ValidatorError('The name must be a string.')
      )
  
      expect(() => new Category({name: 't'.repeat(200)})).toThrow(
        new ValidatorError('The name must be less or equal than 155 characters.')
      )
      
    })
  
    it('should a invalid category using description property', () => {
      expect(() => new Category({name: 'Movie', description: 5 as any})).toThrow(
        new ValidatorError('The description must be a string.')
      )
    })
  
    it('should a invalid category using is_active property', () => {
      expect(() => new Category({name: 'Movie', is_active: 5 as any})).toThrow(
        new ValidatorError('the is_active must be a bollean.')
      )
    })

    it('should a valid category', () => {
      expect.assertions(0)
      new Category({name: 'Movie', description: 'some description', is_active: false})      
    })
  })

  describe('update method', () => {
    it('should a invalid category using name property', () => {
      const category = new Category({name: 'movie'})

      expect(() => category.update(null, null)).toThrow(
        new ValidatorError('The name is required.')
      )
  
      expect(() => category.update('', null)).toThrow(
        new ValidatorError('The name is required.')
      )
  
      expect(() => category.update(5 as any, null)).toThrow(
        new ValidatorError('The name must be a string.')
      )
  
      expect(() => category.update('t'.repeat(200), null)).toThrow(
        new ValidatorError('The name must be less or equal than 155 characters.')
      )
      
    })
  
    it('should a invalid category using description property', () => {
      const category = new Category({name: 'movie'})

      expect(() => category.update('Movie', 5 as any)).toThrow(
        new ValidatorError('The description must be a string.')
      )
    })

    it('should a valid category', () => {
      expect.assertions(0)
      const category = new Category({name: 'Movie', description: 'some description', is_active: false})     
      category.update('name changed', null) 
    })
  })

  
})