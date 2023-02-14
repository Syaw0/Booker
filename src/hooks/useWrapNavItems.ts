import { useDispatch } from "react-redux";
import {
  addToMenu,
  addToNav,
  popFromMenu,
  popFromNav,
} from "src/store/userCart/userCart";
import originalNavItems from "src/shared/userDashNavItems";
import { useUserCartStore } from "src/store/userCart/userCartStoreHooks";
import { useEffect } from "react";

const useWrapNavItems = (ref: any) => {
  if (ref == null) {
    return;
  }
  const dispatch = useDispatch();
  const menuItems = useUserCartStore((s) => s.menuItems);
  const navItems = useUserCartStore((s) => s.navbarItems);
  const resizeHandler = () => {
    const divElement = ref.current as HTMLDivElement;
    const anchors = divElement.querySelectorAll("a");
    let anchorWidth = 0;
    anchors.forEach((a) => (anchorWidth += a.clientWidth));

    const pop = (index: any = anchors.length - 1) => {
      const name = anchors[index].id;
      const href = navItems.filter((s) => s.name === name)[0].href;
      anchorWidth -= anchors[index].clientWidth;
      dispatch(popFromNav(name));
      dispatch(addToMenu({ name: name, href: href }));
      if (anchorWidth > window.innerWidth) {
        pop(index - 1);
      }
    };

    if (anchorWidth + 100 > window.innerWidth) {
      pop();
    } else if (
      anchorWidth + 200 < window.innerWidth &&
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
};

export default useWrapNavItems;
