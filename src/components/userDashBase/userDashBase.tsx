import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navIcons } from "src/shared/userDashNavItems";
import { useUserCartStore } from "src/store/userCart/userCartStoreHooks";
import Text from "../typography/typography";
import style from "./userDashBase.module.css";
import Menu from "../menu/menu";
import { useRouter } from "next/router";
import useWrapNavItems from "src/hooks/useWrapNavItems";

const UserDashBase = ({ children }: any) => {
  const router = useRouter();
  const ref: any = useRef(null);
  const navItems = useUserCartStore((s) => s.navbarItems);
  const menuItems = useUserCartStore((s) => s.menuItems);

  useWrapNavItems(ref);

  const [activeLink, setActiveLink] = useState("");
  useEffect(() => {
    setActiveLink(location.pathname);
  }, []);
  return (
    <div data-testid="userDashBaseHolder" className={style.holder}>
      <div ref={ref} data-testid="userDashBaseNavbar" className={style.top}>
        <div className={style.linkHolder}>
          {navItems.map((item) => {
            const Icon = navIcons[item.name];
            return (
              <Link
                data-testid={`userDashNavItemAnchor_${item.name}`}
                href={item.href}
                key={item.name}
                id={item.name}
              >
                <Text
                  testid={`userDashNavItem_${item.name}`}
                  className={`${style.links} ${
                    activeLink === item.href ? style.activeLink : ""
                  }`}
                >
                  {item.name}
                  <Icon width="24" height="24" />
                </Text>
              </Link>
            );
          })}
        </div>
        {menuItems.length > 0 && (
          <div className={style.menuHolder}>
            <Menu
              items={menuItems.map((item) => {
                return {
                  text: item.name,
                  onClick() {
                    router.replace(item.href);
                  },
                };
              })}
            />
          </div>
        )}
      </div>
      <div data-testid="userDashBaseContent" className={style.bottom}>
        {children}
      </div>
    </div>
  );
};

export default UserDashBase;
