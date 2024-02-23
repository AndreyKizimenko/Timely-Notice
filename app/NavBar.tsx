"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import React from "react";

const NavBar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];
  const pathname = usePathname();

  return (
    <nav className="flex space-x-10 border-b items-center h-14 py-8 px-4">
      <Link href="/">
        <Image src="/favicon.ico" alt="logo" width={50} height={50} className="object-contain" priority={true} />
      </Link>

      <ul className="flex space-x-6 text-lg">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={classNames({
              "text-zinc-500 p-2 rounded-lg hover:text-zinc-800 transition-all": true,
              "bg-slate-100": pathname === link.href,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
