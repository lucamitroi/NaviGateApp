import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginCheckGuard } from './login-check.guard';

describe('LoginCheckGuard', () => {
  let guard: LoginCheckGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        LoginCheckGuard,
        { provide: Router, useValue: spy }
      ]
    });

    guard = TestBed.inject(LoginCheckGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    localStorage.clear(); 
  });

  it('should allow activation if token exists in localStorage', () => {
    localStorage.setItem('token', 'dummy-token');

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should block activation and navigate to /login if token is missing', () => {
    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
