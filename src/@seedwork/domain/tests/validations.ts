import ClassValidatorFields from "../validators/class-validator-fields"
import { FieldsErrors } from "../validators/validator-fields-interface"
import {objectContaining} from 'expect'

type Expectd = {
  validator: ClassValidatorFields<any>, data: any
}

expect.extend({
  containsErrorMessages(expected: Expectd, received: FieldsErrors) {
    const {validator, data} = expected
    const isValid = expected.validator.validate(data);

    if(isValid) {
      return {
        pass: false,
        message: () => 'The data is valid'
      }
    }

    const isMatch = objectContaining(received).asymmetricMatch(validator.errors)

    return isMatch 
    ? {pass: true, message: () => ""} 
    : {pass: false, message: () => `The validation errors not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(validator.errors)}`}
  }
})