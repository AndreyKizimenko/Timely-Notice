"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import React from "react";
import { useSession } from "next-auth/react";


const NavBar = () => {
  const { status } = useSession();

  const links = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues/list" },
  ];
  const pathname = usePathname();

  return (
    <nav className="flex justify-between border-b items-center h-14 py-8 px-4">
      <div className="flex space-x-10 ">
        <Link href="/">
          <Image
            src="/favicon.ico"
            alt="logo"
            width={50}
            height={50}
            className="object-contain"
            priority={true}
          />
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
      </div>

      {status === "unauthenticated" && (
        <div>
          <Link
            href={"/auth/signin"}
            className={classNames({
              "text-zinc-500 p-2 rounded-lg hover:text-zinc-800 transition-all": true,
              "bg-slate-100": pathname === "/api/auth/signin",
            })}
          >
            Sign In
          </Link>
          <Link
            href={"/auth/signup"}
            className={classNames({
              "text-zinc-500 p-2 rounded-lg hover:text-zinc-800 transition-all": true,
              "bg-slate-100": pathname === "/api/auth/signin",
            })}
          >
            Sign Up
          </Link>
        </div>
      )}
      {status === "authenticated" && (
        <Link
          href={"/api/auth/signout"}
          className={classNames({
            "text-zinc-500 p-2 rounded-lg hover:text-zinc-800 transition-all": true,
            "bg-slate-100": pathname === "/api/auth/signin",
          })}
        >
          Sign Out
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
