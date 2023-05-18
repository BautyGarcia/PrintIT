import { Logo } from "./logo";
import Link from "next/link";

interface Links{
    label : string;
    router : string;
}

const Links = [{
    label: "Sobre Nosotros",
    route: "/about"
},
{
    label: "Inicio",
    route: "/home"
},
{
    label: "Contactanos",
    route: "/contact-us"
}
]

export const navBar: React.FC = ({}) => {
    return (
        <header className="rounded p-4 border-2 border-black">
            <nav className="flex gap-16 justify-between items-center list-none">

                <div className="w-350 flex gap-32 pl-50 items-center mt-5 mb-5r">
                    <Logo width={40} height={40} display="flex" justifyContent="center" />
                    <h1 className="font-family-Inter font-weight-250">PrintIT</h1>
                </div>
                <div className="flex w-full justify-around items-center">
                {Links.map(({ label, route }: { label: string, route: string }) => (
                    <Link className="color-black text-underline hover:bg-white" key={route} href={route}>
                        {label}
                    </Link>
                ))}
                </div>
                <div>
                    <button className="font-family-Inter mt-3 w-4/5 rounded-lg bg-white py-2 text-black hover:bg-blue-700">

                    </button>
                    <button className="font-family-Inter mt-3 w-4/5 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-700">

                    </button>
                </div>
            </nav>

        </header>
    )
}