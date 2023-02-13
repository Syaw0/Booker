import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import IconBookmark from "src/assets/icons/iconBookmark";
import IconBooks from "src/assets/icons/iconBooks";
import IconCart from "src/assets/icons/iconCart";
import IconSearch from "src/assets/icons/iconSearch";
import checkInputsEmptiness from "src/utils/checkInputEmptiness";
import TextInput from "../input/text/textInput";
import Profile from "../profile/profile";
import Text from "../typography/typography";
import style from "./navbar.module.css";
const Navbar = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState({ searchInput: "" });
  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };
  const startSearch = () => {
    router.replace(`/books?q=${inputData.searchInput}`);
  };
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

        <Link href={"/user/wishlist"}>
          <IconBookmark
            data-testid="navbarBookmarkIcon"
            width="35"
            height="35"
          />
        </Link>

        <div className={style.cartIconHolder}>
          <Link href={"/user/cart"}>
            <IconCart data-testid="navbarCartIcon" width="35" height="35" />
          </Link>
          <span data-testid="navbarCartNumber" className={style.cartNumber}>
            5
          </span>
        </div>
        <Profile
          data-testid="navbarProfile"
          className={style.profile}
          alt="else"
          height={100}
          width={100}
          url="https://user-images.githubusercontent.com/90524474/218326887-539649b7-a556-4214-a5a3-3d4e7e541bd2.jpg"
        />
      </div>
    </div>
  );
};

export default Navbar;
