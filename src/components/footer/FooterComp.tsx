import { useContext } from 'react';
import { ThemeContext } from '../App';
import { Footer, FooterCopyright, FooterLinkGroup } from 'flowbite-react';

export default function FooterComp() {
  const { dark } = useContext(ThemeContext);

  return (
    <footer className={`${!dark ? '!bg-gray-200' : '!bg-gray-800 text-white'}`}>
      <Footer
        container
        className={`p-4 ${
          !dark ? '!bg-gray-200' : '!bg-gray-800 text-white'
        } rounded-0 max-w-[1600px] lg:max-w-[2300px] m-auto shadow-none`}
      >
        <FooterCopyright
          className={`${
            dark ? 'text-white' : 'text-black'
          } text-[1.1rem] lg:!text-[1.5rem]`}
          by=' VAULT33™'
          year={2025}
        />
        <FooterLinkGroup className='flex justify-center align-middle gap-5 pt-2 mb-0'>
          <FooterLink
            children='GitHub'
            href='https://github.com/thedenisovan?tab=overview&from=2025-08-01&to=2025-08-12'
            dark={dark}
          />
          <FooterLink
            children='LinkedIn'
            href='https://www.linkedin.com/in/dainis-dilevka-961a332b4/'
            dark={dark}
          />
          <FooterLink
            children='Licensing'
            href='https://rawg.io/apidocs?utm_source=chatgpt.com#terms/'
            dark={dark}
          />
        </FooterLinkGroup>
      </Footer>
    </footer>
  );
}

function FooterLink({
  children,
  href,
  dark,
}: {
  children: string;
  href: string;
  dark: boolean;
}) {
  return (
    <li>
      <a
        className={`!no-underline md:text-[1.2rem] lg:!mr-[2rem] ${
          dark ? 'text-white' : 'text-black'
        } lg:!text-[1.3rem]`}
        href={href}
        target='_blank'
      >
        {children}
      </a>
    </li>
  );
}
