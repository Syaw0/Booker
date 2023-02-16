/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import originalNavItems from "src/shared/userDashNavItems";
import { useEffect } from "react";
import { useUserDashStore } from "src/store/userDashStoreHooks";

const useWrapNavItems = (ref: any) => {
  if (ref == null) {
    return;
  }
  const dispatch = useDispatch();
  const menuItems = useUserDashStore((s) => s.menuItems);
  const navItems = useUserDashStore((s) => s.navbarItems);
  const actionType = useUserDashStore((s) => s.actionType);
  const resizeHandler = () => {
    const divElement = ref.current as HTMLDivElement;
    const anchors = divElement.querySelectorAll("a");
    let anchorWidth = 0;
    anchors.forEach((a) => (anchorWidth += a.clientWidth));

    const pop = (index: any = anchors.length - 1) => {
      if (index < 0) {
        return;
      }
      const name = anchors[index].id;
      const href = navItems.filter((s) => s.name === name)[0].href;
      anchorWidth -= anchors[index].clientWidth - 40;
      dispatch({ type: `${actionType}/popFromNav`, payload: name });
      dispatch({
        type: `${actionType}/addToMenu`,
        payload: { name: name, href: href },
      });

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
      dispatch({
        type: `${actionType}/popFromMenu`,
        payload: lastItemOfMenu.name,
      });
      dispatch({
        type: `${actionType}/addToNav`,
        payload: lastItemOfMenu,
      });
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
