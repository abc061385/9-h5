"use client";
import { Link } from "@/i18n/navigation";
import { MouseEvent } from "react";
import { LanguageSwitcher } from "../language-switcher";

export const Navbar = () => {
  const handleItemClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const detail = e.currentTarget.closest("details");
    if (detail) {
      detail.removeAttribute("open");
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <ul className="menu menu-horizontal px-1 flex-1 text-[1.5rem]">
        <li>
          <Link href={"/"} className="link" prefetch={true}>
            Home
          </Link>
        </li>
        <li>
          <details>
            <summary>other</summary>
            <ul className="bg-base-100 rounded-t-none p-2">
              <li>
                <Link href={"/demo"} className="link" onClick={handleItemClick}>
                  DEMO
                </Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
      <div>
        <LanguageSwitcher />
      </div>
    </div>
  );
};
