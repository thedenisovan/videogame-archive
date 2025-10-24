import type { Games } from '../../App';

interface UserData {
  password: string;
  savedGames: Map<number, Games>[];
}

function validateInput(pass1: string, pass2: string) {
  if (!pass1) return 'Input is required';
  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pass1))
    return `Pattern mismatch`;
  if (pass1 !== pass2) return 'Passwords did not match';
  return 'success';
}

function registerUser(mail: string, pass: string, pass2: string) {
  const userData: UserData = {
    password: pass,
    savedGames: [],
  };

  if (validateInput(pass, pass2) !== 'success')
    return validateInput(pass, pass2);
  else if (localStorage.getItem(mail) !== null) return `user exists`;
  else {
    localStorage.setItem(mail, JSON.stringify(userData));
    return 'success';
  }
}

function signInUser(mail: string, pass: string) {
  const user = localStorage.getItem(mail);
  if (user === null) return 'no user';
  const parsed: UserData = JSON.parse(user);
  if (parsed.password !== pass) return 'no user';
  else {
    localStorage.setItem(
      'current-user',
      JSON.stringify({ ...parsed, id: mail })
    );
    return 'sign in';
  }
}

export { registerUser, signInUser };
