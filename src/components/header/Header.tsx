import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";
import ArrowRight from "../../assets/arrow-right.svg";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="bg-[rgba(5,37,44,0.40)] flex items-center justify-between backdrop-blur-sm w-full border rounded-lg py-3 px-4 xl:w-[75rem] xl:mx-auto">
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <nav role="navigation" className="hidden xl:flex">
        <ul className="flex justify-between gap-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground font-primary"
                  : "text-muted-foreground font-primary"
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tickets"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground font-primary"
                  : "text-muted-foreground font-primary"
              }
            >
              My Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground font-primary"
                  : "text-muted-foreground font-primary"
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
        className="py-3 px-4 text-base leading-5 font-normal font-primary xl:py-4 px-6"
      >
        MY TICKETS <img src={ArrowRight} alt="arrow icon" />
      </Button>
    </header>
  );
}
