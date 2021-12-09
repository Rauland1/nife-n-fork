import Link from "next/link";
import Image from "next/image";
import Searchbar from "./Searchbar";
import { useRouter } from "next/router";
import { MdSearch } from "react-icons/md";
import MobileNav from "./Mobile/MobileNav";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import mobileSearch from "../../utils/mobileSearch";
import Logo from "../../public/review-app-logo.svg";
import headerStyles from "../../styles/Header.module.scss";

import { LINKS, USER_LINKS } from "../constants";

const Header = () => {
  const router = useRouter();
  const { user } = useUser();
  const [linksToUse, setLinksToUse] = useState([]);

  useEffect(() => {
    if (user) setLinksToUse(USER_LINKS);
    else if (!user) setLinksToUse(LINKS);
  }, [user]);

  useEffect(() => {
    window.addEventListener("scroll", function (event) {
      event.preventDefault();

      if (window.scrollY > 10 && window.innerWidth < 768)
        document.querySelector("#header").classList.add("headerBorder");
      else if (window.scrollY < 10 && window.innerWidth < 768)
        document.querySelector("#header").classList.remove("headerBorder");
    });

    if (window.innerWidth < 768) {
      document.querySelector("#mobileNavWrapper").style.display = "block";
    } else {
      document.querySelector("#mobileNavWrapper").style.display = "none";
    }
  }, []);

  useEffect(() => {
    if (router.pathname === "/" || window.innerWidth < 768) {
      document.querySelector("#hiddenSearch").style.display = "none";
      document.querySelector("#header").classList.remove("headerBorder");
    } else if (window.innerWidth > 768 && router.pathname !== "/") {
      document.querySelector("#hiddenSearch").style.display = "flex";
      document.querySelector("#header").classList.add("headerBorder");
    }
  }, [router]);

  return (
    <header className={headerStyles.header} id="header">
      <nav className={headerStyles.navbar}>
        <button
          id="mobileSearchBtn"
          className={headerStyles.mobileSearchBtn}
          onClick={() => mobileSearch(true)}
        >
          <MdSearch size={25} />
        </button>

        <div className={headerStyles.navLogo} id="navbarLogo">
          <Link href="/">
            <a>
              <Image src={Logo} alt="Nife & Fork" priority />
            </a>
          </Link>
        </div>
        <div
          id="hiddenSearch"
          className={headerStyles.hiddenSearch}
          style={{ display: "none" }}
        >
          <Searchbar />
        </div>
        <ul className={headerStyles.navList}>
          {linksToUse.length > 0 &&
            linksToUse.map((link) => {
              if (link.name === "Profile")
                link.path = `/profile/${user.nickname}`;
              if (!link.btn && link.onDesktop) {
                return (
                  <li key={link.name}>
                    <Link href={link.path}>
                      <button className={headerStyles.navLink}>
                        {link.name}
                      </button>
                    </Link>
                  </li>
                );
              } else if (link.btn && link.onDesktop) {
                return (
                  <li key={link.name}>
                    <Link href={link.path} as={link.path}>
                      <button className={headerStyles.signUpBtn}>
                        {link.name}
                      </button>
                    </Link>
                  </li>
                );
              } else {
                return null;
              }
            })}
        </ul>

        <MobileNav user={user} />
      </nav>
    </header>
  );
};

export default Header;
