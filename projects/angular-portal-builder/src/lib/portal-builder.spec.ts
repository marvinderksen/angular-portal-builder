import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { Component, InjectionToken, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ComponentRegistration } from './component-registration';
import { ComponentRegistry } from './component-registry';
import { InvalidOperation } from './invalid-operation';
import { PortalBuilder } from './portal-builder';


@Component({ selector: 'app-test', template: '' })
class TestComponent { }

const testRegistration: ComponentRegistration = {
    componentType: TestComponent,
    matches: (candidate: string) => candidate === 'test',
};

const testRegistry: ComponentRegistry = new ComponentRegistry([
    testRegistration,
]);

const TEST_TOKEN = new InjectionToken<any>('Test');

const testInjector = Injector.create({
    providers: [{ provide: TEST_TOKEN, useValue: 'test' }],
});

describe('PortalBuilder', () => {
    let portalOutletMock: jest.Mocked<Partial<CdkPortalOutlet>>;
    let portalOutlet: CdkPortalOutlet;

    beforeEach(() => {
        portalOutletMock = {
            attachComponentPortal: jest.fn(),
        };
        portalOutlet = portalOutletMock as CdkPortalOutlet;

        TestBed.configureTestingModule({}).compileComponents();
    });

    describe(`GIVEN all other requirements are met`, () => {
        let preparedBuilder: PortalBuilder;

        beforeEach(() => {
            preparedBuilder = new PortalBuilder()
                .whenPicked(() => { })
                .useInjector(testInjector);
        });

        test(`WHEN #attachTo with a pick but without a registry THEN it will fail`, () => {
            const builder = preparedBuilder.pick('test');

            const act = () => builder.attachTo(portalOutlet);

            expect(act).toThrow(InvalidOperation);
        });

        test(`WHEN #attachTo with a registry but without a pick THEN it will fail`, () => {
            const builder = preparedBuilder.useRegistry(testRegistry);

            const act = () => builder.attachTo(portalOutlet);

            expect(act).toThrow(InvalidOperation);
        });
    });

    describe(`GIVEN a registration for an identifier 'test'`, () => {
        let preparedBuilder: PortalBuilder;

        beforeEach(() => {
            preparedBuilder = new PortalBuilder().useRegistry(testRegistry);
        });

        test(`when #attachTo with pick 'test2' THEN it will fail`, () => {
            const builder = preparedBuilder.pick('test2');

            const act = () => builder.attachTo(portalOutlet);

            expect(act).toThrow();
        });

        test(`when #attachTo with pick 'test' THEN it will attach the portal to the outlet`, () => {
            const builder = preparedBuilder.pick('test');
            const expectedPortal = new ComponentPortal(
                TestComponent,
                null,
                undefined
            );

            builder.attachTo(portalOutlet);

            expect(portalOutlet.attachComponentPortal).toBeCalledWith(expectedPortal);
        });

        describe(`AND 'test' is picked`, () => {
            beforeEach(() => {
                preparedBuilder = preparedBuilder.pick('test');
            });

            test(`WHEN #attachTo with a pick callback THEN it will propagate the picked registration`, () => {
                const onPick = jest.fn();
                const builder = preparedBuilder.whenPicked(onPick);
                const expectedPick = testRegistration;

                builder.attachTo(portalOutlet);

                expect(onPick).toBeCalledWith(expectedPick);
            });

            test(`WHEN #attachTo with a provided injector THEN the attached portal will contain the injector`, () => {
                const expectedPortal = new ComponentPortal(
                    TestComponent,
                    null,
                    testInjector
                );
                const builder = preparedBuilder.useInjector(testInjector);

                builder.attachTo(portalOutlet);

                expect(portalOutlet.attachComponentPortal).toBeCalledWith(
                    expectedPortal
                );
            });
        });
    });

    test(`WHEN providing an array for #useRegistry THEN it will be the same as providing a registry`, () => {
        const builderWithArray = new PortalBuilder().useRegistry([
            testRegistration,
        ]);
        const builderWithRegistry = new PortalBuilder().useRegistry(testRegistry);

        expect(builderWithArray).toEqual(builderWithRegistry);
    });

    test(`WHEN using #pick THEN it will be the same as using #useIdentifier`, () => {
        const builderWithPick = new PortalBuilder().pick('test');
        const builderWithUseIdentifier = new PortalBuilder().useIdentifier('test');

        expect(builderWithPick).toEqual(builderWithUseIdentifier);
    });

    test(`WHEN providing an array for #useInjector THEN it will be the same as providing an injector`, () => {
        const builderWithArray = new PortalBuilder().useInjector([
            { provide: TEST_TOKEN, useValue: 'test' },
        ]);
        const builderWithInjector = new PortalBuilder().useInjector(testInjector);

        expect(builderWithArray).toEqual(builderWithInjector);
    });
});
