import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { TfiGithub, TfiFacebook, TfiTwitterAlt } from 'react-icons/tfi';
import { FormContext } from './Authorization';
import { AuthorizationContext } from '../../App';
import { registerUser, signInUser } from './authValidation';
import RegistrationToast from './Toasts';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  validation?: string;
};

export default function SignInForm() {
  const { formData, isSignInPage } = useContext(FormContext);
  // holds state of registration validity result
  const [validityError, setValidityError] = useState<string>('');

  return (
    <form
      className='flex flex-col !mt-[2rem] !mb-[1rem] gap-3 md:!gap-1 w-[80%] '
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormInput id='mail' value={formData.mail} type='email' label='Email' />
      <FormInput
        id='pass'
        value={formData.pass}
        label='Password'
        validation={`^(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$`}
      />
      {/* if user is on sign up page add extra input el for password confirmation */}
      {!isSignInPage && (
        <FormInput
          validation={`^(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$`}
          id='passConfirm'
          value={formData.passConfirm}
          label='Password confirmation'
        />
      )}

      {/*returns correct toast based on validity state*/}
      <RegistrationToast result={validityError} />

      <SignUpSvgButtons />

      {!isSignInPage && (
        <RegistrationButton setValidityError={setValidityError} />
      )}
      {isSignInPage && <SignInButton setValidityError={setValidityError} />}
      <p className='mb-0 md:!mt-2 italic text-[0.8rem] text-green-600 text-center'>
        *Details are saved in local storage
      </p>
    </form>
  );
}

function RegistrationButton({
  setValidityError,
}: {
  setValidityError: (str: string) => void;
}) {
  const { formData, isSignInPage, changeAuthPage, eraseInput } =
    useContext(FormContext);
  return (
    <button
      onClick={() => {
        // password validity test
        const validityResult = registerUser(
          formData.mail,
          formData.pass,
          formData.passConfirm
        );
        setValidityError(validityResult);
        // if valid pass erase input and go to sign in page
        if (validityResult === 'success') {
          changeAuthPage();
          eraseInput();
        }
      }}
      className='border-1 !rounded-[8px] h-[2.5rem] shadow-2xl hover:shadow-black transition'
      aria-label={`${isSignInPage ? 'Log in button' : 'Sign up button'}`}
    >
      Sign up
    </button>
  );
}

function SignInButton({
  setValidityError,
}: {
  setValidityError: (str: string) => void;
}) {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthorizationContext);
  const { formData, isSignInPage, eraseInput } = useContext(FormContext);
  return (
    <button
      onClick={() => {
        // password and email validity test
        const validityResult = signInUser(formData.mail, formData.pass);
        setValidityError(validityResult);
        // if sign in details are correct set logged in flag to true e.g. sign in user.
        if (validityResult === 'sign in') {
          navigate('/');
          eraseInput();
          setLoggedIn(true);
        }
      }}
      className='border-1 !rounded-[8px] h-[2.5rem] shadow-2xl hover:shadow-black transition'
      aria-label={`${isSignInPage ? 'Log in button' : 'Sign up button'}`}
    >
      Sign in
    </button>
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
    <div className='relative flex flex-col'>
      <label className='absolute -top-5 md:-top-6 lg:!-top-5' htmlFor={id}>
        {label}
      </label>
      <input
        onChange={(e) => {
          updateInput(e.target.value, e.target.id);
        }}
        value={value}
        className='
          rounded-[8px] text-black !outline-none
          border-1 mb-2 md:!mb-6'
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
    <section className='flex flex-col gap-3 lg:!gap-0'>
      <p className='text-center italic mb-1 mt-2 lg:!my-5'>Or sign in with</p>
      <div className='flex justify-center gap-4 mb-3 lg:!mb-4'>
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
    </section>
  );
}
