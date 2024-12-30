import { AnimatePresence, motion } from "motion/react";
import { Fragment, useState } from "react";
import HamburgerIcon from "../../assets/bars-solid.svg";
import DropDownIcon from "../../assets/caret-down-solid.svg";
import styles from "./Header.module.css"

const data = ["Home", "About Us", "Contact Us", "Research"];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showMenu, setShowMenu] = useState(false);


  return (
    <header className={`bg-green-800 text-white py-4 px-10 flex items-center relative z-10 ${styles["header"]}`}>
      <h1 className="text-3xl font-bold mr-auto">Hello World</h1>
      <AnimatePresence>
        <motion.nav
          className={`lg:block px-10 lg:px-0 fixed lg:static z-20 bg-green-800 lg:bg-inherit inset-0 top-full lg:h-auto transition-all duration-300 overflow-hidden lg:overflow-visible bottom-full  ${showMenu ? styles["nav-menu"] : "h-0"
            }`}
        >
          <ul className="grid lg:inline-flex lg:gap-10 gap-3">
            {data.map((x, i) => (
              <Fragment key={i}>
                <li
                  className="relative w-max"
                  onMouseEnter={() => setCurrentIndex(i)}
                  onMouseLeave={() => setCurrentIndex(-1)}
                >
                  <a
                    href="#"
                    className="block place-content-center place-items-center text-xl lg:text-base"
                  >
                    {x}
                    <button className="size-4">
                      <img
                        src={DropDownIcon}
                        alt="Dropdown Icon"
                        className="w-full h-full ml-2"
                      />
                    </button>
                    <AnimatePresence>
                      {currentIndex === i && (
                        <motion.div
                          className="lg:absolute top-full z-10 px-4 py-2.5 text-nowrap bg-green-800 overflow-hidden text-base"
                          exit={{ opacity: 0, height: 0 }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          key={i}
                        >
                          <DropdownMenu />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </motion.nav>
      </AnimatePresence>
      <button
        className="size-6 block lg:hidden"
        onClick={() => setShowMenu((x) => !x)}
      >
        <img src={HamburgerIcon} alt="Hamburger Icon" />
      </button>
    </header>
  );
};

export const DropdownMenu = () => {
  return (
    <ul className="space-y-2">
      <li>Hello World</li>
      <li>Hello World</li>
      <li>Hello World</li>
      <li>Hello World</li>
      <li>Hello World</li>
    </ul>
  );
};

export default Header;
