import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  const userCredentials = {
    login: 'angular@mail.ru',
    password: 'Angular2312!',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user', () => {
    service.login(userCredentials);
    service.user$.subscribe((value) => {
      expect(value).toEqual(userCredentials);
    });
  });

  it('should logout user', () => {
    service.logout();
    service.user$.subscribe((value) => {
      expect(value).toBeNull();
    });
  });

  it('should back to main page', () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    service.goToAdmin();
    expect(navigateSpy).toHaveBeenCalledWith('admin');
  });
});
