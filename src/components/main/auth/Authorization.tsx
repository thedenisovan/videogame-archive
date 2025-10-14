import { useState, useContext } from 'react';
import SignInForm from './SignInForm';
import FormContext from '../../context/FormContext';
import { ThemeContext } from '../../App';

type FormData = {
  mail: string;
  pass: string;
  passConfirm: string;
};

export default function Authorization() {
  const { dark } = useContext(ThemeContext);
  // Decides which page should be visible, sign in or registration
  const [isSignInPage, setSignInPage] = useState<boolean>(true);
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
    isSignInPage ? option1 : option2;

  // switch between sign in and registration components
  const changeAuthPage = () => setSignInPage(!isSignInPage);

  return (
    <main
      className={`
      flex-1 flex flex-col justify-center items-center relative
      md:w-[70vw] md:!m-auto md:gap-12 md:text-xl
      lg:text-2xl lg:w-[600px] lg:max-h-[900px] lg:rounded-2xl lg:shadow-2xl
      ${dark ? 'lg:bg-gray-600' : 'lg:bg-gray-100'}
      `}
    >
      <section>
        <h2 className='mb-0 text-center !font-normal md:!text-4xl lg:!text-5xl'>
          {returnText('Good to see you!', 'Welcome')}
        </h2>
        <p className='text-center !font-normal italic md:text-xl lg:text-2xl mt-1 lg:!mt-2'>
          {returnText('Lets continue our journey', 'Sign up to get started')}
        </p>
      </section>
      <FormContext
        value={{
          formData,
          updateInput,
          isSignInPage,
          changeAuthPage,
          eraseInput,
        }}
      >
        <SignInForm />
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

export { FormContext };
