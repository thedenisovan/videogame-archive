import { describe, it, expect } from 'vitest';

import {
  signInUser,
  registerUser,
} from '../../components/main/auth/authValidation';

describe('authorization tests', () => {
  let result: string;

  it('incorrect pass pattern should not register user', () => {
    result = registerUser('test@mail.com', 'wrongPass', 'wrongPassAuth');
    expect(result).toBe('Pattern mismatch');
  });

  it('password miss match error', () => {
    result = registerUser(
      'test@mail.com',
      'correctPass@123.com',
      'passMissMatch'
    );
    expect(result).toBe('Passwords did not match');
  });

  it('correct sign up details registers new user', () => {
    result = registerUser(
      'test@mail.com',
      'correctPass@123.com',
      'correctPass@123.com'
    );
    expect(result).toBe('success');
  });

  it('wrong email should not sign in user', () => {
    result = signInUser('mouse@.com', 'correctPass@123.com');
    expect(result).toBe('no user');
  });

  it('wrong password should not sign in user', () => {
    result = signInUser('test@mail.com', 'wrongPassword@123.com');
    expect(result).toBe('no user');
  });

  it('correct email and password should sign in user', () => {
    result = signInUser('test@mail.com', 'correctPass@123.com');
    expect(result).toBe('sign in');
  });
});
