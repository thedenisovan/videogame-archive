import { useContext } from 'react';
import { ThemeContext } from '../App';
import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from 'flowbite-react';

export default function FooterComp() {
  const { dark } = useContext(ThemeContext);

  return (
    <Footer
      container
      className={`p-4 ${!dark ? 'bg-gray-400' : 'bg-gray-700 text-white'}`}
    >
      <FooterCopyright by=' VAULT33™' year={2025} />
      <FooterLinkGroup className='flex justify-around'>
        <FooterLink href='#'>About</FooterLink>
        <FooterLink href='#'>Privacy Policy</FooterLink>
        <FooterLink href='#'>Licensing</FooterLink>
        <FooterLink href='#'>Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
