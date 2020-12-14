# angular-portal-builder example Application

Check out [`src/app/directions/node-host`](https://github.com/marvinderksen/angular-portal-builder/tree/main/projects/examples/a2b/src/app/directions/node-host) to see the `PortalBuilder` in action.

## Decoupling components

If you used a design-time array for the component registrations instead of the html switch you would not play this game to its full extent:

```ts
const knownComponents: ComponentRegistration[] = [
  {
    componentType: CabComponent,
    matches: (candidate: string) => candidate === 'cab',
  },
  {
    componentType: FlightComponent,
    matches: (candidate: string) => candidate === 'flight',
  },
  {
    componentType: TrainComponent,
    matches: (candidate: string) => candidate === 'train',
  },
  {
    componentType: WalkComponent,
    matches: (candidate: string) => candidate === 'walk',
  },
];
```

instead of

```html
<ng-container [ngSwitch]="node.type">
  <app-cab *ngSwitchCase="'cab'"></app-cab>
  <app-flight *ngSwitchCase="'flight'"></app-flight>
  <app-train *ngSwitchCase="'train'"></app-train>
  <app-walk *ngSwitchCase="'walk'"></app-walk>
</ng-container>
```

There is however a way to not have to know all possible registrations in one point at design-time: **Provide each registration via an injection-token** and collect these where you need them for the `PortalBuilder`.

```ts
const COMPONENT_REGISTRATION = new InjectionToken<ComponentRegistration>(
  'ComponentRegistration'
);

[...]

@NgModule({
  declarations: [TrainComponent],
  ...
  providers: [
    {
      provide: COMPONENT_REGISTRATION,
      useValue: {
        componentType: TrainComponent,
        matches: (candidate: string) => candidate === 'train',
      },
      multi: true,
    },
  ],
})
export class TrainModule {}

[...]

@NgModule({
  declarations: [WalkComponent],
  ...
  providers: [
    {
      provide: COMPONENT_REGISTRATION,
      useValue: {
        componentType: WalkComponent,
        matches: (candidate: string) => candidate === 'walk',
      },
      multi: true,
    },
  ],
})
export class WalkModule {}

[...]

@Component({
  selector: 'app-portal-host',
  template: `<ng-template cdkPortalOutlet></ng-template>`
  ...
})
export class HostComponent implements OnInit {
  @Input()
  data: Data | undefined;

  @ViewChild(CdkPortalOutlet, { static: true })
  portalOutlet: CdkPortalOutlet | undefined;

  private readonly portalBuilder = new PortalBuilder();

  constructor(
    @Inject(COMPONENT_REGISTRATION)
    private readonly injectedComponentRegistrations: ComponentRegistration[]
  ) { }

  ngOnInit(): void {
    const componentRef = this.portalBuilder
      .useRegistry(this.injectedComponentRegistrations)
      .pick(this.data.type)
      .attachTo(this.portalOutlet);
  }
}

```
