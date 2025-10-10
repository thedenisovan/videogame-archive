import { useContext } from 'react';
import { ThemeContext } from '../App';
import { Footer, FooterCopyright, FooterLinkGroup } from 'flowbite-react';

export default function FooterComp() {
  const { dark } = useContext(ThemeContext);

  return (
    <Footer
      container
      className={`p-3 ${
        !dark ? '!bg-gray-500' : 'bg-gray-700 text-white'
      } rounded-0`}
    >
      <FooterCopyright
        className={`${dark ? 'text-white' : 'text-black'}`}
        by=' VAULT33™'
        year={2025}
      />
      <FooterLinkGroup className='flex justify-around '>
        <a
          className={` ${dark ? 'text-white' : 'text-black'}`}
          href='https://github.com/thedenisovan?tab=overview&from=2025-08-01&to=2025-08-12'
          target='_blank'
        >
          GitHub
        </a>
        <a
          className={` ${dark ? 'text-white' : 'text-black'}`}
          href='https://www.linkedin.com/in/dainis-dilevka-961a332b4/'
          target='_blank'
        >
          LinkedIn
        </a>
        <a
          className={` ${dark ? 'text-white' : 'text-black'}`}
          href='https://rawg.io/apidocs?utm_source=chatgpt.com#terms'
          target='_blank'
        >
          Licensing
        </a>
      </FooterLinkGroup>
    </Footer>
  );
}
