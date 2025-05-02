import { TestBed } from '@angular/core/testing';
import { RoleAuthGuard } from './role-auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('RoleAuthGuard', () => {
  let guard: RoleAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoleAuthGuard,
        { provide: AuthService, useValue: { isAuthenticated: () => true, getRole: () => 'admin' } },
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    });
    guard = TestBed.inject(RoleAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
