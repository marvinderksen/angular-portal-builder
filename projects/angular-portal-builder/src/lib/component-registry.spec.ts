import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ComponentRegistration } from './component-registration';
import { ComponentRegistry } from './component-registry';
import { NoSuitableRegistration } from './no-suitable-registration';


@Component({ selector: 'app-test', template: '' })
class TestComponent { }

@Component({ selector: 'app-test', template: '' })
class TestComponent2 { }

const testRegistration: ComponentRegistration = {
    componentType: TestComponent,
    matches: jest.fn((candidate) => candidate === 'test'),
};
const testRegistration2: ComponentRegistration = {
    componentType: TestComponent2,
    matches: jest.fn((candidate) => candidate === 'test'),
};

describe('ComponentRegistry', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({}).compileComponents();
    });

    test(`WHEN #find against an empty registry THEN it will fail`, () => {
        const registry = new ComponentRegistry([]);
        const act = () => registry.find('test');

        expect(act).toThrow(NoSuitableRegistration);
    });

    describe(`GIVEN a registration for an identifier 'test'`, () => {
        let registry: ComponentRegistry;

        beforeEach(() => {
            registry = new ComponentRegistry([testRegistration]);
        });

        test(`WHEN #find with 'test2' THEN it will fail`, () => {
            const act = () => registry.find('test2');

            expect(act).toThrow(NoSuitableRegistration);
            expect(<jest.Mock>testRegistration.matches).toBeCalledWith('test2');
        });

        test(`WHEN #find with 'test' THEN it will return the registration`, () => {
            const result = registry.find('test');

            expect(result).toBe(testRegistration);
            expect(<jest.Mock>testRegistration.matches).toBeCalledWith('test');
        });
    });

    describe(`GIVEN multiple registrations for an identifier 'test'`, () => {
        let registry: ComponentRegistry;

        beforeEach(() => {
            registry = new ComponentRegistry([testRegistration, testRegistration2]);
        });

        test(`WHEN #find with 'test' THEN it will return the first registration`, () => {
            const result = registry.find('test');

            expect(result).toBe(testRegistration);
            expect(<jest.Mock>testRegistration.matches).toBeCalledWith('test');
            expect(<jest.Mock>testRegistration2.matches).toBeCalledTimes(0);
        });
    });
});
