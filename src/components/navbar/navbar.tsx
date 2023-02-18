import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import IconBookmark from "src/assets/icons/iconBookmark";
import IconBooks from "src/assets/icons/iconBooks";
import IconCart from "src/assets/icons/iconCart";
import IconSearch from "src/assets/icons/iconSearch";
import { useHomeStore } from "src/store/home/homeStoreHooks";
import checkInputsEmptiness from "src/utils/checkInputEmptiness";
import TextInput from "../input/text/textInput";
import Profile from "../profile/profile";
import Text from "../typography/typography";
import style from "./navbar.module.css";
const Navbar = () => {
  const router = useRouter();
  const { isLogin, user } = useHomeStore((s) => s);
  const [inputData, setInputData] = useState({ searchInput: "" });
  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };
  const startSearch = () => {
    router.replace(`/books?q=${inputData.searchInput}`);
  };
  console.log(user);
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!checkInputs()) {
        return;
      }
      startSearch();
    }
  };
  const handleClick = () => {
    if (!checkInputs()) {
      return;
    }
    startSearch();
  };
  const checkInputs = () => {
    if (!checkInputsEmptiness(inputData)) {
      return false;
    }
    return true;
  };
  const navigateToSearchPage = () => {
    router.replace("/books");
  };
  return (
    <div data-testid="navbarHolder" className={style.holder}>
      <Link data-testid="navbarLeftAnchor" href={"/"}>
        <div data-testid="navbarLeft" className={style.left}>
          <IconBooks height="40" width="40" />
          <Text className={style.logoText} variant="headlineMedium">
            Booker
          </Text>
        </div>
      </Link>

      <div data-testid="navbarMiddle" className={style.middle}>
        <TextInput
          className={style.searchInput}
          testId="navbarSearchInput"
          EndIcon={
            <IconSearch
              data-testid="navbarSearchInputIcon"
              onClick={handleClick}
              width="25"
              height="25"
            />
          }
          name="searchInput"
          id="navbarSearchInput"
          type="search"
          placeholder="Search Through 9.000 Books..."
          onChange={handleChanges}
          value={inputData.searchInput}
          onKeyDown={handleKeydown}
        />
      </div>

      <div data-testid="navbarRight" className={style.right}>
        <IconSearch
          data-testid="navbarSearchIcon"
          onClick={navigateToSearchPage}
          className={style.searchIcon}
          width="35"
          height="35"
        />

        <Link href={isLogin ? "/user/wishlist" : "/auth"}>
          <IconBookmark
            data-testid="navbarBookmarkIcon"
            width="35"
            height="35"
          />
        </Link>

        <div className={style.cartIconHolder}>
          <Link href={isLogin ? "/user/cart" : "/auth"}>
            <IconCart data-testid="navbarCartIcon" width="35" height="35" />
          </Link>
          {isLogin && (
            <span data-testid="navbarCartNumber" className={style.cartNumber}>
              {user.cartNumber}
            </span>
          )}
        </div>
        <Profile
          data-testid="navbarProfile"
          className={style.profile}
          alt="else"
          height={100}
          width={100}
          url={user.profileUrl}
        />
      </div>
    </div>
  );
};

export default Navbar;
