'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "@/components/layout/Navbar.module.css";
import { useEffect, useRef } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const navCordinates = useRef();
  const navTitle = useRef();

  console.log(pathname);

  useEffect(() => {
    if (navCordinates.current && pathname === '/') {
      navTitle.current.classList.add('stikey');
      console.log(navCordinates.current);
      const navRect = navCordinates.current.getBoundingClientRect();
      const navRectHeight = navRect.height;

      console.log(navRectHeight);
      window.addEventListener('scroll', () => {
        if (navRectHeight >= window.scrollY) {
          navTitle.current.classList.add('stikey');
        }
        else {
          navTitle.current.classList.remove('stikey');
        }
      })
    }
    else if (pathname !== '/') {
      navTitle.current.classList.remove('stikey');
    }
  }, [navCordinates, pathname])

  // console.log(navCordinates.current.getBoundingClientRect());

  const navLinks = [
    {
      label: 'בית',
      href: '/#',
    },
    {
      label: 'משפטים',
      href: '/#sentences',
    },
    {
      label: 'עץ משפחתי',
      href: '/#family-tree',
    },
    {
      label: 'תמונות',
      href: '/#photos',
    },
    {
      label: 'הוספת משפט',
      href: '/add-sentence',
      active: pathname === '/add-sentence' ? 'active' : ''
    },
  ]

  return (
    <nav className={classes.nav} ref={navCordinates}>
      <div className="nav-title" ref={navTitle}>
        <span>רבקה דוד ז״ל 09.11.1940 - 19.04.2023</span>
      </div>
      <ul>
        {navLinks.map((item, i) => (
          <li key={i}>
            <Link
              key={item.href}
              href={item.href}
              style={item?.active ? { textDecoration: ' underline' } : {}}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
