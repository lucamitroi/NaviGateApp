import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PreventNavigationGuard } from './prevent-navigation.guard';

describe('PreventNavigationGuard', () => {
  let guard: PreventNavigationGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        PreventNavigationGuard,
        { provide: Router, useValue: spy }
      ]
    });

    guard = TestBed.inject(PreventNavigationGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should block navigation and redirect to /dashboard if token exists', () => {
    localStorage.setItem('token', 'dummy-token');

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should allow navigation if token is not present', () => {
    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});