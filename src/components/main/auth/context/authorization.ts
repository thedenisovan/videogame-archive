function validateInput(pass1: string, pass2: string) {
  if (!pass1) return 'Input is required';
  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pass1))
    return `Pattern mismatch`;
  if (pass1 !== pass2) return 'Passwords did not match';
  return 'success';
}

function registerUser(
  mail: string,
  pass: string,
  isSignInPage: boolean,
  pass2: string
) {
  if (validateInput(pass, pass2) !== 'success')
    return validateInput(pass, pass2);
  else if (localStorage.getItem(mail) !== null) return `user exists`;
  else if (!isSignInPage) {
    localStorage.setItem(mail, pass);
    return 'success';
  }
  return 'success';
}

export { registerUser };
