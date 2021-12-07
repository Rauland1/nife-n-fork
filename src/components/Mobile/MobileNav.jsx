import Link from "next/link";
import { useState, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import blurContent from "../../../utils/blurContent";
import { Turn as Hamburger } from "hamburger-react";
import headerStyles from "../../../styles/Header.module.scss";

import { LINKS, USER_LINKS } from "../../constants";

const MobileNav = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [linksToUse, setLinksToUse] = useState([]);

  useEffect(() => {
    if (user) setLinksToUse(USER_LINKS);
    else setLinksToUse(LINKS);
  }, [user]);

  const handleClick = () => {
    setOpen(!open);
    blurContent(!open);
  };

  return (
    <div id="mobileNavWrapper">
      <div className={headerStyles.mobileNav}>
        <button
          className={
            open
              ? `${headerStyles.mobileNavBtn} ${headerStyles.mobileNavBtnClose}`
              : headerStyles.mobileNavBtn
          }
          onClick={handleClick}
        >
          {/* {open ? <MdClose /> : <MdMenu />} */}
          <Hamburger
            toggled={open}
            toggle={setOpen}
            size={25}
            distance="sm"
            rounded
          />
        </button>
      </div>
      <aside
        className={
          open
            ? `${headerStyles.aside} ${headerStyles.asideOpen}`
            : headerStyles.aside
        }
      >
        <ul>
          {linksToUse.length > 0 &&
            linksToUse.map((link) => {
              if (!link.btn && link.onMobile) {
                return (
                  <li key={link.name}>
                    <Link href={link.path}>
                      <button
                        onClick={handleClick}
                        className={headerStyles.navLink}
                      >
                        {link.name}
                      </button>
                    </Link>
                  </li>
                );
              } else if (link.onMobile) {
                return (
                  <li key={link.name}>
                    <Link href={link.path}>
                      <button
                        onClick={handleClick}
                        className={headerStyles.navLink}
                      >
                        {link.name}
                      </button>
                    </Link>
                  </li>
                );
              }
            })}
        </ul>
      </aside>
    </div>
  );
};

export default MobileNav;
