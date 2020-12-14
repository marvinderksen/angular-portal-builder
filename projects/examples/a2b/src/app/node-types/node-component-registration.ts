import { InjectionToken } from '@angular/core';
import { ComponentRegistration } from 'angular-portal-builder';

export const NODE_COMPONENT_REGISTRATION = new InjectionToken<ComponentRegistration>(
  'NodeComponentRegistration'
);
