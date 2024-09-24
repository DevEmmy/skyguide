import Link from 'next/link';
import { RiMenu2Line } from 'react-icons/ri';

const NavBar = () => {
  return (
    <header className='px-16 py-5 '>
      <nav className='flex  items-center justify-between text-white'>
        <div className='text-[24px] font-semibold'>
          SkyGuide
        </div>

        <div className='flex gap-10'>
          <Link href={"/"}>
            Weather
          </Link>

          <Link href="/">
            Flight Planning
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;