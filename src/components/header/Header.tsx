import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";
import ArrowRight from "../../assets/arrow-right.svg";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-2 z-50 w-full backdrop-blur-sm px-4">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-3  border bg-[rgba(5,37,44,0.40)] rounded-[0.75rem]  sm:px-6 md:px-8 lg:px-10">
        <NavLink to="/" className="shrink-0">
          <img src={logo} alt="logo" className="h-8 w-auto sm:h-10" />
        </NavLink>

        <nav role="navigation" className="hidden md:flex">
          <ul className="flex items-center gap-4 md:gap-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-primary ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`
                }
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  `font-primary ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`
                }
              >
                My Tickets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `font-primary ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`
                }
              >
                About Project
              </NavLink>
            </li>
          </ul>
        </nav>

        <Button
          variant="secondary"
          size="lg"
          className="flex items-center gap-2 whitespace-nowrap rounded-[0.75rem] py-2 px-3 text-sm leading-5 font-normal font-primary sm:py-3 sm:px-4 sm:text-base md:py-4 md:px-6"
        >
          MY TICKETS
          <img
            src={ArrowRight}
            alt="arrow icon"
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        </Button>
      </div>
    </header>
  );
}
