"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { DropdownMenu, Button, Text } from "@radix-ui/themes";

const NavBar = () => {
  const { status, data: session } = useSession();

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
                "nav-link": true,
                "bg-slate-100": pathname === link.href,
              })}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">Authentication</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {status === "unauthenticated" && (
            <>
              <DropdownMenu.Item>
                <Link href={"/auth/signin"}>Sign In</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                {" "}
                <Link href={"/auth/signup"}>Sign Up</Link>
              </DropdownMenu.Item>
            </>
          )}
          {status === "authenticated" && (
            <>
              <p className="text-sm p-2">{session.user?.email}</p>
              <DropdownMenu.Item>
                <Link
                  href={"/api/auth/signout"}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign Out
                </Link>
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </nav>
  );
};

export default NavBar;
