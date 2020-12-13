import { ComponentType } from '@angular/cdk/portal';

export interface ComponentRegistration<TComponent = any, TIdentifier = string> {
  readonly componentType: ComponentType<TComponent>;
  matches(candidate: TIdentifier): boolean;
}
