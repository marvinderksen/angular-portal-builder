import { InjectionToken } from '@angular/core';

import { ComponentRegistration } from './component-registration';

export const COMPONENT_REGISTRATION = new InjectionToken<ComponentRegistration>(
    'ComponentRegistration'
);