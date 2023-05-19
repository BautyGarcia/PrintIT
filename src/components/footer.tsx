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
    <footer className="absolute h-44 w-full  bg-indigo-600">
      <h1 className="mt-14 flex items-center justify-center text-4xl text-white">
        PrintiIT
      </h1>
      <h6 className="font-family-nunito mb-6 flex items-center justify-center text-xs text-white">
        Copyright @ 2023
      </h6>
      <div className="absolute flex w-full items-center justify-center gap-24 text-xs">
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
  );
};
