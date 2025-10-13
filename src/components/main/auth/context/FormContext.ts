import { createContext } from 'react';

const FormContext = createContext({
  formData: {
    mail: '',
    pass: '',
    passConfirm: '',
  },
  updateInput: (_e: string, _id: string) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  isSignInPage: true,
  changeAuthPage: () => {},
  eraseInput: () => {},
});

export default FormContext;
