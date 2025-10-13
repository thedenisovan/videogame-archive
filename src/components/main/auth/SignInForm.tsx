import { useContext, useState } from 'react';
import { TfiFacebook } from 'react-icons/tfi';
import { TfiGithub } from 'react-icons/tfi';
import { TfiTwitterAlt } from 'react-icons/tfi';
import { FormContext } from './Authorization';
import { registerUser } from './context/authorization';
import RegistrationToast from './Toasts';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  validation?: string;
};

export default function SignInForm({
  returnText,
}: {
  returnText: (val1: string, val2: string) => string;
}) {
  const { formData, isSignInPage, changeAuthPage, eraseInput } =
    useContext(FormContext);

  // holds state of registration validity result
  const [validityError, setValidityError] = useState<string>('');

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
        validation='^(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$'
      />
      {/* if user is on sign up page add extra input el for password confirmation */}
      {!isSignInPage && (
        <FormInput
          validation='^(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$'
          id='passConfirm'
          value={formData.passConfirm}
          label='Password confirmation'
        />
      )}

      {/*returns correct toast based on validity state*/}
      <RegistrationToast result={validityError} />

      <p className='text-center mb-0'>Or</p>

      <SignUpSvgButtons />

      <button
        onClick={() => {
          // password validity test
          const validityResult = registerUser(
            formData.mail,
            formData.pass,
            isSignInPage,
            formData.passConfirm
          );
          setValidityError(validityResult);
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
        className='
          rounded-[8px] text-black !outline-none
        focus:invalid:border-red-700 focus:invalid:!border-2
          border-1 valid:border-green-500'
        type={type}
        id={id}
        pattern={validation}
        required
      />
    </div>
  );
}

function SignUpSvgButtons() {
  return (
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
  );
}
