import { Logo } from "./logo";
import Link from "next/link";

interface Links {
  label: string;
  router: string;
}

const Links = [
  {
    label: "Sobre Nosotros",
    route: "/about",
  },
  {
    label: "Inicio",
    route: "/home",
  },
  {
    label: "Contactanos",
    route: "/contact-us",
  },
];

export const NavBar: React.FC = ({}) => {
  return (
    <header className="h-24 w-full rounded border-2 border-black p-4">
      <nav className="flex list-none items-center justify-between gap-16">
        <div className="w-350 pl-50 mb-0 mt-0 flex items-center gap-4 text-center">
          <Logo width={40} height={40} display="flex" justifyContent="center" />
          <h1 className="font-family-Inter font-weight-250 felx justify-center">
            PrintIT
          </h1>
        </div>
        <div className="flex w-2/4 items-center justify-evenly">
          {Links.map(({ label, route }: { label: string; route: string }) => (
            <Link
              className="color-black text-underline"
              key={route}
              href={route}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex w-2/6 flex-row items-center justify-center gap-5">
          <button className="font-family-Inter mt-3 w-2/5 rounded-lg border-2 border-black bg-white py-2 text-black hover:bg-gray-500">
            <p>
              <Link href={"/signIn"}>Log In</Link>
            </p>
          </button>
          <button className="font-family-Inter mt-3 w-2/5 rounded-lg border-none bg-blue-500 py-2 text-white hover:bg-blue-700">
            <p>
              <Link href={"/signUp"}>Register</Link>
            </p>
          </button>
        </div>
      </nav>
    </header>
  );
};
