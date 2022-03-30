import Entity from '../../../@seedwork/domain/entity/entity'
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id";
import ValidatorRules from '../../../@seedwork/validators/validator-rules'

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export default class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate(props)
    super(props, id)
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  static validate(props: Omit<CategoryProperties, 'created_at'>) {
    ValidatorRules.values(props.name, 'name').required().string().maxLength(155)
    ValidatorRules.values(props.description, 'description').string()
    ValidatorRules.values(props.is_active, 'is_active').boolean()
  }

  update(name: string, description: string): void {
    Category.validate({name, description})
    this.name = name;
    this.description = description;
  }  

  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set name(value: string) {
    this.props.name = value ?? null;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }
}

