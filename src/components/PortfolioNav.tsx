import { memo, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

const RESUME_URL = '/Saugat_Giri_Soft_Dev_Resume.pdf' as const;

function PortfolioNavInner() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const rawReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const reduceMotion = hydrated && Boolean(rawReducedMotion);

  const enter = (delay = 0) =>
    reduceMotion
      ? { duration: 0 }
      : { duration: 0.52, ease: EASE_SMOOTH, delay };

  useEffect(() => {
    const anchors = document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]'
    );
    const handlers: Array<{ el: HTMLAnchorElement; fn: (e: Event) => void }> =
      [];
    anchors.forEach((a) => {
      const fn = (e: Event) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const href = a.getAttribute('href');
        if (!href || href === '#') {
          document.getElementById('home')?.scrollIntoView({
            behavior: 'smooth',
          });
          return;
        }
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      };
      a.addEventListener('click', fn);
      handlers.push({ el: a, fn });
    });
    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
    };
  }, []);

  return (
    <motion.header
      className="pf-nav"
      initial={reduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={enter(0)}
    >
      <div className="pf-wrap">
        <div className="pf-nav-inner">
          <a href="#home" className="pf-logo">
            Saugat G<span>.</span>
          </a>
          <button
            type="button"
            className="pf-nav-menu-toggle"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="pf-mobile-menu"
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          >
            {isMobileMenuOpen ? (
              <X strokeWidth={2} aria-hidden />
            ) : (
              <Menu strokeWidth={2} aria-hidden />
            )}
          </button>
          <nav aria-label="Primary">
            <ul className="pf-nav-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </nav>
          <div className="pf-nav-actions">
            <button
              type="button"
              className="pf-theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === 'light'
                  ? 'Switch to dark mode'
                  : 'Switch to light mode'
              }
            >
              {theme === 'light' ? (
                <Moon strokeWidth={2} aria-hidden />
              ) : (
                <Sun strokeWidth={2} aria-hidden />
              )}
            </button>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pf-nav-resume"
            >
              Resume
            </a>
            <a href="#contact" className="pf-nav-cta">
              Contact
            </a>
          </div>
        </div>
        <div
          id="pf-mobile-menu"
          className={`pf-mobile-menu${isMobileMenuOpen ? ' is-open' : ''}`}
        >
          <nav aria-label="Primary mobile">
            <ul className="pf-mobile-nav-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
          <div className="pf-mobile-menu-actions">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pf-nav-resume"
            >
              Resume
            </a>
            <a href="#contact" className="pf-nav-cta">
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export const PortfolioNav = memo(PortfolioNavInner);
