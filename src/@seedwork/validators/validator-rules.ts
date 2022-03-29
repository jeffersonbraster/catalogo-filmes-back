import ValidatorError from "../errors/validator-error";


export default class ValidatorRules {

  private constructor(private value: any, private prop: string){}

  static values(value: any, prop: string) {
    return new ValidatorRules(value, prop);
  }

  required(): Omit<this, 'required'> {
    if(this.value === null || this.value === undefined || this.value === "") {
      throw new ValidatorError(`The ${this.prop} is required.`)
    }
    return this;
  }

  string(): Omit<this, 'string'> {
    if(!isEmpty(this.value) && typeof this.value !== 'string') {
      throw new ValidatorError(`The ${this.prop} must be a string.`)
    }

    return this;
  }

  maxLength(max: number): Omit<this, 'maxLength'> {
    if(!isEmpty(this.value) && this.value.length > max) {
      throw new ValidatorError(`The ${this.prop} must be less or equal than ${max} characters.`)
    }
    return this;
  }

  boolean(): Omit<this, 'boolean'>   {
    if(!isEmpty(this.value) && typeof this.value !== 'boolean') {
      throw new ValidatorError(`the ${this.prop} must be a bollean.`)
    }

    return this
  }
}

export function isEmpty(value: any) {
  return value === undefined || value === null
}