import { ComponentRegistration } from './component-registration';
import { NoSuitableRegistration } from './no-suitable-registration';

export class ComponentRegistry<
  TComponent = any,
  TIdentifier = string,
  TRegistration extends ComponentRegistration<
    TComponent,
    TIdentifier
  > = ComponentRegistration<TComponent, TIdentifier>
> {
  constructor(private readonly registrations: TRegistration[]) {}

  public find(identifier: TIdentifier): TRegistration {
    const registration = this.registrations.find((it) =>
      it.matches(identifier)
    );

    if (!registration) {
      throw new NoSuitableRegistration(
        `No such registration found for identifier '${identifier}'`
      );
    }

    return registration;
  }
}
