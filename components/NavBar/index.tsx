import Link from 'next/link';
import { RiMenu2Line } from 'react-icons/ri';

const NavBar = () => {
  return (
    <header className='px-16 py-5 '>
      <nav className='grid md:grid-cols-3  items-center justify-between text-white'>
        <div className='text-xl max-md:hidden'>
          weather forecast
        </div>
        <div className='text-center font-semibold text-2xl md:text-3xl lg:text-4xl'>Sky-Guide</div>
        <div className='flex align-right justify-end'>
          <RiMenu2Line className=' right-0' size={23}/>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;