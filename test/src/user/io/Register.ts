import {Length, Min, Max} from 'class-validator'

export class IRegister {
  @Length(13)
  phone: string

  @Length(2, 10)
  name: string

  @Min(18)
  @Max(50)
  age: number
}

class Button {
  text: string
}

export class ORegister {
  /**
   * user's id
   */
  userId: string

  buttons: Button[]
}
