# AngularPortalBuilder

Use @angular/cdk's PortalOutlet instead of if/else or switches in your templates :)

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
$npm install angular-portal-builder
```

## Usage

Please have a look at [the lib's readme](https://github.com/marvinderksen/angular-portal-builder/tree/main/projects/angular-portal-builder).

## Example

You will find a small example application at [examples/a2b](https://github.com/marvinderksen/angular-portal-builder/tree/main/projects/examples/a2b).
