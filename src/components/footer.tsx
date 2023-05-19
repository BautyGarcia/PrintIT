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

export const Footer: React.FC = ({}) => {
    return (
        <footer className="bg-indigo-600 h-72">
            <h1 className="flex justify-center items-center text-white"> 
                PrintiIT 
            </h1>
            <h6 className="flex justify-center items-center text-white">
                Copyright @ 2023
            </h6>
            <div className="flex w-full items-center justify-evenly">
                {Links.map(({ label, route }: { label: string; route: string }) => (
                    <Link
                        className="color-white text-underline text-white"
                        key={route}
                        href={route}
                >
                        {label}
                    </Link>
          ))}
        </div>
        </footer>
    )
}
     