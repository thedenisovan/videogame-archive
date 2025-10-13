import { Toast, ToastToggle } from 'flowbite-react';
import { HiCheck, HiExclamation } from 'react-icons/hi';

export function PassTest({ result }: { result: string }) {
  return (
    <div className='flex flex-col gap-4 absolute right-2 top-2'>
      <Toast className='p-1'>
        <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200'>
          <HiExclamation className='h-7 w-5' />
        </div>
        <div className='ml-3 text-sm font-normal'>{result}</div>
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
