'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { RiCloseFill, RiMenu2Line, RiMenu4Line } from 'react-icons/ri';

const NavBar = () => {
  const [active, setActive] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navItems = [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Weather',
      href: '/',
    },
    {
      title: 'Flight Planning',
      href: '/flight-planning',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Your onScroll logic here
      // Example: Add a class to the navbar when scrolling down
      const navbar = document.querySelector("#nbar");
      if (navbar && window.scrollY > 0) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className='section py-5 ' id='nbar'>
      <nav className='flex items-center justify-between text-white'>
        <div className='text-[24px] font-semibold'>SkyGuide</div>

        {/*  */}
        <div className={`flex max-sm:hidden gap-10`}>
          {navItems?.map((item: any, i: number) => {
            return (
              <div>
                <Link
                  href={item?.href}
                  className={` ${
                    i == active ? 'text-white font-semibold' : 'text-gray-300'
                  }`}
                  onClick={() => setActive(i)}>
                  {item?.title}
                </Link>
              </div>
            );
          })}
        </div>

        <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? (
            <RiMenu4Line size={24} className='' />
          ) : (
            <RiCloseFill size={24}/>
          )}
        </button>
      </nav>

      {/* Mobile */}
      <div className='sm:hidden flex'>
      {isOpen && (
              <ul className={`absolute bg-white toggle top-16 right-0 mx-4 rounded-xl px-6 py-8 flex flex-col gap-5`}>
              {navItems?.map((item: any, i: number) => {
                return (
                  <li onClick={() => setIsOpen(false)}>
                    <Link
                      href={item?.href}
                      className={` ${
                        i == active ? 'text-black font-semibold' : 'text-gray-600'
                      }`}
                      onClick={() => setActive(i)}>
                      {item?.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
      )}
      </div>
    </header>
  );
};

export default NavBar;
