import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useUserCartStore } from "src/store/userCart/userCartStoreHooks";
import Text from "../typography/typography";
import style from "./userDashBase.module.css";

const UserDashBase = ({ children }: any) => {
  const ref: any = useRef(null);
  const navItems = useUserCartStore((s) => s.navbarItems);
  const [activeLink, setActiveLink] = useState("");
  useEffect(() => {
    setActiveLink(location.pathname);
  }, []);
  return (
    <div data-testid="userDashBaseHolder" className={style.holder}>
      <div ref={ref} data-testid="userDashBaseNavbar" className={style.top}>
        {navItems.map((item) => {
          const Icon = item.Icon;
          return (
            <Link
              data-testid={`userDashNavItemAnchor_${item.name}`}
              href={item.href}
              key={item.name}
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
      <div data-testid="userDashBaseContent" className={style.bottom}>
        {children}
      </div>
    </div>
  );
};

export default UserDashBase;
