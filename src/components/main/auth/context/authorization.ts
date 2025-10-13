function validateInput(value: string) {
  if (!value) return 'Input is required';
  if (value.length < 8) return 'Password must be at least 8 characters length';
  if (!/[A-Z]/.test(value)) return 'Must contain an uppercase letter';
  if (!/[a-z]/.test(value)) return 'Must contain a lowercase letter';
  if (!/[0-9]/.test(value)) return 'Must contain a number';
  if (!/[!@#$%^&*]/.test(value)) return 'Must contain a special character';
  return '';
}

function validatePassMatch(pass1: string, pass2: string) {
  if (pass1 !== pass2) return 'Passwords did not match';
  return '';
}

function registerUser(
  mail: string,
  pass: string,
  isSignInPage: boolean,
  pass2: string
) {
  if (validateInput(pass) !== '') return validateInput(pass);
  else if (validatePassMatch(pass, pass2) !== '')
    return validatePassMatch(pass, pass2);
  else if (localStorage.getItem(mail) === null && !isSignInPage)
    localStorage.setItem(mail, pass);
}

export { registerUser };
