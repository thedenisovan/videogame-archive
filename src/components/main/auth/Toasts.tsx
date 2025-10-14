import { Toast, ToastToggle } from 'flowbite-react';
import { HiCheck, HiExclamation } from 'react-icons/hi';

// returns correct toast based on validity state
export default function RegistrationToast({ result }: { result: string }) {
  switch (result) {
    case 'Passwords did not match':
      return <InvalidValidity result='Passwords did not match' />;
    case 'Pattern mismatch':
      return (
        <InvalidValidity
          result='Password requirements: minimum 8 characters, including 1 uppercase
           letter, 1 number, and 1 special character.'
        />
      );
    case 'success':
      return (
        <SuccessRegistration result='You have been registered successfully' />
      );
    case 'user exists':
      return (
        <InvalidValidity result={`User with given email address exists`} />
      );
    case 'no user':
      return <InvalidValidity result={`Email or password are incorrect`} />;
  }
}

export function InvalidValidity({ result }: { result: string }) {
  return (
    <div className='flex flex-col gap-4 absolute right-2 top-2'>
      <Toast className='p-2 lg:!w-[500px]'>
        <div
          className={`
            inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
            bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200
            l
            `}
        >
          <HiExclamation className='h-7 w-5' />
        </div>
        <div className='ml-3 text-sm font-normal lg:text-xl '>{result}</div>
        <ToastToggle />
      </Toast>
    </div>
  );
}

export function SuccessRegistration({ result }: { result: string }) {
  return (
    <div className='flex flex-col gap-4 absolute right-2 top-2'>
      <Toast className='p-2'>
        <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
          <HiCheck className='h-5 w-5' />
        </div>
        <div className='ml-3 text-sm font-normal'>{result}</div>
        <ToastToggle />
      </Toast>
    </div>
  );
}
