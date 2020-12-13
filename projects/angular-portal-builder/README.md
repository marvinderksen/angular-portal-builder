# angular-portal-builder

Why? Because of this:

```html
<ng-container [ngSwitch]="node.type">
  <app-cab *ngSwitchCase="'cab'"></app-cab>
  <app-flight *ngSwitchCase="'flight'"></app-flight>
  <app-train *ngSwitchCase="'train'"></app-train>
  <app-walk *ngSwitchCase="'walk'"></app-walk>
</ng-container>
```

## Installation

```bash
npm install angular-portal-builder
```

## Usage

1. Screw ngSwitch or if/else

2. Use the `PortalBuilder` instead:

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

  ngOnInit(): void {
    const componentRef = this.portalBuilder
      .useRegistry(knownComponents)
      .pick(this.data.type)
      .attachTo(this.portalOutlet);
  }
}

```

3. ???

4. Profit
