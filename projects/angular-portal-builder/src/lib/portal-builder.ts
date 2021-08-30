import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injector, StaticProvider } from '@angular/core';

import { ComponentRegistration } from './component-registration';
import { ComponentRegistry } from './component-registry';
import { InvalidOperation } from './invalid-operation';

export class PortalBuilder<
  TComponent = any,
  TIdentifier = string,
  TRegistration extends ComponentRegistration<
    TComponent,
    TIdentifier
  > = ComponentRegistration<TComponent, TIdentifier>
> {
  constructor(
    private readonly registry?: ComponentRegistry<
      TComponent,
      TIdentifier,
      TRegistration
    >,
    private readonly identifier?: TIdentifier,
    private readonly onPick?: (result: TRegistration) => void,
    private readonly injector?: Injector
  ) {}

  useRegistry(
    registrations: TRegistration[]
  ): PortalBuilder<TComponent, TIdentifier, TRegistration>;
  useRegistry(
    registry: ComponentRegistry<TComponent, TIdentifier, TRegistration>
  ): PortalBuilder<TComponent, TIdentifier, TRegistration>;
  useRegistry(
    registryOrRegistrations:
      | ComponentRegistry<TComponent, TIdentifier, TRegistration>
      | TRegistration[]
  ): PortalBuilder<TComponent, TIdentifier, TRegistration> {
    const registry: ComponentRegistry<TComponent, TIdentifier, TRegistration> =
      registryOrRegistrations instanceof ComponentRegistry
        ? registryOrRegistrations
        : new ComponentRegistry<TComponent, TIdentifier, TRegistration>(
            registryOrRegistrations
          );

    return new PortalBuilder(
      registry,
      this.identifier,
      this.onPick,
      this.injector
    );
  }

  /**
   * @alias useIdentifier
   */
  pick(
    identifier: TIdentifier
  ): PortalBuilder<TComponent, TIdentifier, TRegistration> {
    return this.useIdentifier(identifier);
  }
  useIdentifier(
    identifier: TIdentifier
  ): PortalBuilder<TComponent, TIdentifier, TRegistration> {
    return new PortalBuilder(
      this.registry,
      identifier,
      this.onPick,
      this.injector
    );
  }

  whenPicked(
    onPick: (result: TRegistration) => void
  ): PortalBuilder<TComponent, TIdentifier, TRegistration> {
    return new PortalBuilder(
      this.registry,
      this.identifier,
      onPick,
      this.injector
    );
  }

  useInjector(
    injector: Injector
  ): PortalBuilder<TComponent, TIdentifier, TRegistration>;
  useInjector(
    providers: StaticProvider[],
    parent?: Injector,
    name?: string
  ): PortalBuilder<TComponent, TIdentifier, TRegistration>;
  useInjector(
    injectorOrProviders: Injector | StaticProvider[],
    parent?: Injector,
    name?: string
  ): PortalBuilder<TComponent, TIdentifier, TRegistration> {
    const injector: Injector = Array.isArray(injectorOrProviders)
      ? Injector.create({
          providers: injectorOrProviders,
          parent,
          name,
        })
      : injectorOrProviders;

    return new PortalBuilder(
      this.registry,
      this.identifier,
      this.onPick,
      injector
    );
  }

  attachTo(outlet: CdkPortalOutlet): ComponentRef<TComponent> {
    if (!this.registry) {
      throw new InvalidOperation(
        `No registry or registrations provided. Did you forget to useRegistry()?`
      );
    }
    if (!this.identifier) {
      throw new InvalidOperation(
        `No identifier provided. Did you forget to pick() or useIdentifier()?`
      );
    }

    const registration = this.registry.find(this.identifier);

    if (typeof this.onPick === 'function') {
      this.onPick(registration);
    }

    outlet.detach();
    return outlet.attachComponentPortal<TComponent>(
      new ComponentPortal(registration.componentType, null, this.injector)
    );
  }
}
