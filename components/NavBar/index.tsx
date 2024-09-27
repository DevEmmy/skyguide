'use client'
import Link from 'next/link';
import { useState } from 'react';
import { RiMenu2Line } from 'react-icons/ri';

const NavBar = () => {
  const [active,setActive] = useState(0)
  const navItems = [
    {
      title: 'About',
      href: '/about'
    },
    {
      title: 'Weather',
      href: '/'
    },
    {
      title: 'Flight Planning',
      href: '/flight-planning'
    },
  ]
  return (
    <header className='px-16 py-5 '>
      <nav className='flex  items-center justify-between text-white'>
        <div className='text-[24px] font-semibold'>
          SkyGuide
        </div>

        <div className='flex gap-10'>

          {
            navItems?.map((item: any, i: number) => {
              return (
                <Link href={item?.href} className={` ${i == active ? 'text-white font-semibold' : 'text-gray-300'}`} 
                onClick={() => setActive(i)}>
                  {item?.title}
                </Link>
              )
            })
          }
        </div>
      </nav>
    </header>
  );
};

export default NavBar;