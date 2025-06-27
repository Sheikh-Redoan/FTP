import { useEffect, useRef, useState } from "react";
import styles from "./MobileFooter.module.css";

const MobileFooter = ({ menuItems, onMenuClick }) => {
  const navRef = useRef(null);
  const lineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // This effect runs whenever the activeIndex changes,
  // positioning the line under the active menu item.
  useEffect(() => {
    const nav = navRef.current;
    const line = lineRef.current;
    if (!nav || !line) return;

    // Find the currently active link based on the state
    const activeLink = nav.querySelector(`a:nth-child(${activeIndex + 1})`);

    if (activeLink) {
      line.style.width = `${activeLink.offsetWidth}px`;
      line.style.left = `${activeLink.offsetLeft + activeLink.offsetWidth / 2}px`;
    }
    // We add menuItems to the dependency array to recalculate if they ever change.
  }, [activeIndex, menuItems]);

  const handleMenuClick = (e, index, menuName) => {
    e.preventDefault();
    setActiveIndex(index);
    onMenuClick(menuName);
  };

  return (
    <nav className={`${styles.mobileFooter} !bg-white !text-black`} role="menulist" ref={navRef}>
      {menuItems.map((item, index) => (
        <a
          href="#!"
          role="menuitem"
          // The 'active' class is now controlled by React state
          className={index === activeIndex ? styles.active : ""}
          key={item.name}
          // The onClick handler is simplified
          onClick={(e) => handleMenuClick(e, index, item.name)}
        >
          <item.icon className={styles.icon} />
          {item.label}
        </a>
      ))}
      <i
        ref={lineRef} // We use a ref to get a direct reference to the line element
        className={styles.line}
        id="nav-current"
        aria-hidden="true"
      >
        current item
      </i>
    </nav>
  );
};

export default MobileFooter;