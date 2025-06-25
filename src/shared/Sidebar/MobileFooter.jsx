// src/shared/Sidebar/MobileFooter.jsx
import { useEffect, useRef } from "react";
import styles from "./MobileFooter.module.css";

const MobileFooter = ({ menuItems, onMenuClick }) => {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let a = 0;
    let c = 0;
    let i = 1;
    const links = nav.getElementsByTagName("a");
    let line = nav.querySelector(`.${styles.line}`);

    if (!line) {
      line = document.createElement("i");
      line.setAttribute("aria-hidden", "true");
      line.className = styles.line;
      line.innerHTML = "current";
      nav.appendChild(line);
    }

    line.id = "nav-current";
    if (!line.innerHTML.length) line.innerHTML = "current";

    const place = (l, link) => {
      link.setAttribute("aria-describedby", l.id || "nav-current");
      l.style.width = `${link.offsetWidth}px`;
      l.style.left = `${link.offsetLeft + link.offsetWidth / 2}px`;
    };

    const clickHandler = (e, index) => {
      e.preventDefault();
      a = index;
      const t = setInterval(() => {
        if (links[c]) {
          links[c].classList.remove(styles.traversing);
          links[c].classList.remove(styles.active);
        }
        if (a > c) i = 1;
        else if (a < c) i = -1;
        c += i;
        if (links[c]) {
          links[c].classList.add(styles.traversing);
        }
        if (c !== -1 && links[c - i]) {
          links[c - i].classList.remove(styles.active);
        }
        if (c === a) {
          if (e.target) {
            e.target.classList.remove(styles.traversing);
            e.target.classList.add(styles.active);
          }
          i = 0;
          clearInterval(t);
        }
      }, 100);
      place(line, e.target);
      onMenuClick(links[index].dataset.menu);
    };

    const linkListeners = [];
    Array.from(links).forEach((link, index) => {
      link.removeAttribute("aria-describedby");
      if (link.classList.contains(styles.active)) {
        place(line, link);
      }
      const listener = (e) => clickHandler(e, index);
      link.addEventListener("click", listener);
      linkListeners.push({ link, listener });
    });

    const activeLink = nav.querySelector(`.${styles.active}`);
    if (activeLink) {
      place(line, activeLink);
    }

    return () => {
      linkListeners.forEach(({ link, listener }) => {
        link.removeEventListener("click", listener);
      });
    };
  }, [menuItems, onMenuClick]);

  return (
    <nav className={styles.mobileFooter} role="menulist" ref={navRef}>
      {menuItems.map((item, index) => (
        <a
          href="#!"
          role="menuitem"
          className={index === 0 ? styles.active : ""}
          key={item.name}
          data-menu={item.name}
        >
          <item.icon className={styles.icon} />
          {item.label}
        </a>
      ))}
      <i className={styles.line} id="nav-current">
        current item
      </i>
    </nav>
  );
};

export default MobileFooter;