"use client";

import MobileFooter from "./MobileFooter";

import { menuList } from "../../../data/menu";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileMenu({ setActiveMobileMenu, activeMobileMenu }) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuItem, setMenuItem] = useState("");

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] == pathname?.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split("/")[1] == pathname?.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    setShowMenu(true);
  }, []);

  const pathname = usePathname();

  return (
    <div
      className={`d-none md:d-block header-menu js-mobile-menu-toggle ${
        activeMobileMenu ? "-is-el-visible" : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        {showMenu && activeMobileMenu && (
          <div className="mobileMenu text-dark-1">
            {menuList.map((elm, i) => {
              if (elm.title) {
                return (
                  <div key={i} className="submenuOne">
                    <Link
                      key={i}
                      className={
                        pathname?.split("/")[1] == elm.href?.split("/")[1]
                          ? "title activeMenu link"
                          : "title link inActiveMenu"
                      }
                      href={elm.href}
                    >
                      <span
                        className={
                          elm.title == menuItem ? "activeMenu" : "inActiveMenu"
                        }
                      >
                        {elm.title}
                      </span>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        )}

        {/* mobile footer start */}
        <MobileFooter />
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        onClick={() => {
          setActiveMobileMenu(false);
        }}
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div
        className="header-menu-bg"
        onClick={() => setActiveMobileMenu(false)}
      ></div>
    </div>
  );
}
