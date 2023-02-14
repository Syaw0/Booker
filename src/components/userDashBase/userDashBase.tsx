import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { navIcons } from "src/shared/userDashNavItems";
import {
  addToMenu,
  addToNav,
  popFromMenu,
  popFromNav,
} from "src/store/userCart/userCart";
import { useUserCartStore } from "src/store/userCart/userCartStoreHooks";
import Text from "../typography/typography";
import style from "./userDashBase.module.css";
import originalNavItems from "src/shared/userDashNavItems";

const UserDashBase = ({ children }: any) => {
  const dispatch = useDispatch();
  const ref: any = useRef(null);
  const navItems = useUserCartStore((s) => s.navbarItems);
  const menuItems = useUserCartStore((s) => s.menuItems);

  // TODO write Hook For this logic
  const resizeHandler = () => {
    const divElement = ref.current as HTMLDivElement;
    const anchors = divElement.querySelectorAll("a");
    let anchorWidth = 0;
    anchors.forEach((a) => (anchorWidth += a.clientWidth));

    if (anchorWidth > window.innerWidth) {
      const name = anchors[anchors.length - 1].id;
      const href = navItems.filter((s) => s.name === name)[0].href;
      dispatch(popFromNav(name));
      dispatch(addToMenu({ name: name, href: href }));
    } else if (
      anchorWidth + 110 < window.innerWidth &&
      navItems.length !== originalNavItems.length
    ) {
      const lastItemOfMenu = menuItems[menuItems.length - 1];
      dispatch(popFromMenu(lastItemOfMenu.name));
      dispatch(addToNav(lastItemOfMenu));
    }
  };
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    window.removeEventListener("resize", resizeHandler);
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [menuItems, navItems]);

  const [activeLink, setActiveLink] = useState("");
  useEffect(() => {
    setActiveLink(location.pathname);
  }, []);
  return (
    <div data-testid="userDashBaseHolder" className={style.holder}>
      <div ref={ref} data-testid="userDashBaseNavbar" className={style.top}>
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
      <div data-testid="userDashBaseContent" className={style.bottom}>
        {children}
      </div>
    </div>
  );
};

export default UserDashBase;
