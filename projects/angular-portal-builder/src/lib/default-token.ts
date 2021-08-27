import { InjectionToken } from '@angular/core';

import { ComponentRegistration } from './component-registration';

const COMPONENT_REGISTRATION = new InjectionToken<ComponentRegistration>(
    'ComponentRegistration'
);