import { useState, createContext, useContext } from 'react';
import { TfiFacebook } from 'react-icons/tfi';
import { TfiGithub } from 'react-icons/tfi';
import { TfiTwitterAlt } from 'react-icons/tfi';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
};

type FormData = {
  mail: string;
  pass: string;
  passConfirm: string;
};

const FormContext = createContext({
  formData: {
    mail: '',
    pass: '',
    passConfirm: '',
  },
  updateInput: (_e: string, _id: string) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  isSignIn: false,
});

export default function Authorization() {
  const [isSignIn, setSignIn] = useState<boolean>(true);

  const [formData, setFormData] = useState<FormData>({
    mail: '',
    pass: '',
    passConfirm: '',
  });

  const eraseInput = () =>
    setFormData({
      mail: '',
      pass: '',
      passConfirm: '',
    });

  const updateInput = (e: string, id: string) =>
    setFormData({
      ...formData,
      [id]: e,
    });

  // return appropriate text based on current page
  const returnText = (option1: string, option2: string) =>
    isSignIn ? option1 : option2;

  // is used to switch between sign in and registration components
  const changeAuthPage = () => setSignIn(!isSignIn);

  return (
    <main className='flex-1 flex flex-col justify-center'>
      <h2 className='mb-0 text-center !font-normal'>
        {returnText('Good to see you!', 'Welcome')}
      </h2>
      <p className='text-center !font-normal italic'>
        {returnText('Lets continue our journey', 'Sign up to get started')}
      </p>
      <FormContext value={{ formData, updateInput, isSignIn }}>
        <SignInForm returnText={returnText} />
      </FormContext>

      <div className='flex flex-col'>
        <p className='text-center mt-3 mb-0'>
          {returnText("Don't have an account?", 'Have an account all ready?')}
        </p>
        <button
          onClick={() => {
            changeAuthPage();
            eraseInput();
          }}
          className='underline'
        >
          {returnText('Sign up', 'Sign in')}
        </button>
      </div>
    </main>
  );
}

// component for sign up form
function SignInForm({
  returnText,
}: {
  returnText: (val1: string, val2: string) => string;
}) {
  const { formData, isSignIn } = useContext(FormContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className='flex flex-col !m-[2rem] gap-2'
    >
      <FormInput id='mail' value={formData.mail} type='email' label='Email' />
      <FormInput id='pass' value={formData.pass} label='Password' />
      {/* if user is on sign up page add extra input el for password confirmation */}
      {!isSignIn && (
        <FormInput
          id='passConfirm'
          value={formData.passConfirm}
          label='Password confirmation'
        />
      )}

      <p className='text-center mb-0'>Or</p>

      <div className='flex justify-center gap-4 mb-2'>
        <TfiFacebook className='border-1 hover:cursor-pointer rounded-2xl h-8 w-8 p-1' />
        <TfiGithub className='border-1 hover:cursor-pointer rounded-2xl h-8 w-8 p-1' />
        <TfiTwitterAlt className='border-1 hover:cursor-pointer rounded-2xl h-8 w-8 p-1' />
      </div>

      <button className='border-1 !rounded-[8px] h-[2.5rem]'>
        {returnText('Log in', 'Sign up')}
      </button>
    </form>
  );
}

// component for single input and label element
function FormInput({ id, label, type = 'password', value }: InputProps) {
  const { updateInput } = useContext(FormContext);

  return (
    <div className='flex flex-col'>
      <label htmlFor={id}>{label}</label>
      <input
        onChange={(e) => {
          updateInput(e.target.value, e.target.id);
        }}
        value={value}
        className='rounded-[8px] text-black'
        type={type}
        id={id}
        required
      />
    </div>
  );
}
