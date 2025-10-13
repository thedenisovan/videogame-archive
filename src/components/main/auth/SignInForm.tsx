import { useContext, useState } from 'react';
import { TfiFacebook } from 'react-icons/tfi';
import { TfiGithub } from 'react-icons/tfi';
import { TfiTwitterAlt } from 'react-icons/tfi';
import { FormContext } from './Authorization';
import { registerUser } from './context/authorization';
import { PassTest } from './Toasts';
import { SuccessRegistration } from './Toasts';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  validation?: string;
};

// component for sign up form
export default function SignInForm({
  returnText,
}: {
  returnText: (val1: string, val2: string) => string;
}) {
  const { formData, isSignInPage, changeAuthPage, eraseInput } =
    useContext(FormContext);
  const [validError, setValidError] = useState<string>('');
  const validationPattern = '^(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$';

  return (
    <form
      className='flex flex-col !m-[2rem] gap-2'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormInput id='mail' value={formData.mail} type='email' label='Email' />
      <FormInput
        id='pass'
        value={formData.pass}
        label='Password'
        validation={validationPattern}
      />
      {/* if user is on sign up page add extra input el for password confirmation */}
      {!isSignInPage && (
        <FormInput
          validation={validationPattern}
          id='passConfirm'
          value={formData.passConfirm}
          label='Password confirmation'
        />
      )}
      {validError === 'Passwords did not match' && (
        <PassTest result='Passwords did not match' />
      )}
      {validError === 'Pattern mismatch' && (
        <PassTest
          result='Password requirements: minimum 8 characters, including 1 uppercase
          letter, 1 number, and 1 special character.'
        />
      )}
      {validError === 'success' && (
        <SuccessRegistration result='You have been registered successfully' />
      )}
      {validError === 'user exists' && (
        <PassTest
          result={`User witch email address ${formData.mail} all ready exists`}
        />
      )}

      <p className='text-center mb-0'>Or</p>

      <div className='flex justify-center gap-4 mb-3'>
        <button
          onClick={(e) => e.preventDefault()}
          aria-label='sign up with facebook'
        >
          <TfiFacebook className='custom-btn' />
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          aria-label='sign up with github'
        >
          <TfiGithub className='custom-btn' />
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          aria-label='sign up with x/twitter'
        >
          <TfiTwitterAlt className='custom-btn' />
        </button>
      </div>
      <button
        onClick={() => {
          // password validity test
          const validityResult = registerUser(
            formData.mail,
            formData.pass,
            isSignInPage,
            formData.passConfirm
          );
          setValidError(validityResult);
          // if valid pass erase input and go to sign in page
          if (validityResult === 'success') {
            changeAuthPage();
            eraseInput();
          }
        }}
        className='border-1 !rounded-[8px] h-[2.5rem]'
        aria-label={`${isSignInPage ? 'Log in button' : 'Sign up button'}`}
      >
        {returnText('Log in', 'Sign up')}
      </button>
    </form>
  );
}

// component for single input and label element
function FormInput({
  id,
  label,
  type = 'password',
  value,
  validation,
}: InputProps) {
  const { updateInput } = useContext(FormContext);

  return (
    <div className='flex flex-col'>
      <label htmlFor={id}>{label}</label>
      <input
        onChange={(e) => {
          updateInput(e.target.value, e.target.id);
        }}
        value={value}
        className='rounded-[8px] text-black invalid:border-red-600 border-1 valid:border-green-500'
        type={type}
        id={id}
        pattern={validation}
        required
      />
    </div>
  );
}
