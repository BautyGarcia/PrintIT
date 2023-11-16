import { signIn } from "next-auth/react";
import { LogoGoogle } from "../Logos/logoGoogle";
import { useMantineColorScheme } from "@mantine/core";

export const AuthShowcase: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <div className="flex w-full justify-center">
      <button
        className={
          colorScheme === "dark"
            ? "font-family-Inter mt-5 flex h-9 w-4/5 flex-row items-center justify-center gap-4 rounded-lg bg-white text-black no-underline transition"
            : "font-family-Inter mt-5 flex h-10 w-4/5 flex-row items-center justify-center gap-4 rounded-lg border-2 border-[#D8D8D8] text-black no-underline transition hover:bg-white/20"
        }
        onClick={() =>
          void signIn("google", {
            callbackUrl: "/dashboard/subirArchivo",
          })
        }
      >
        <LogoGoogle height={20} width={20} />
        Ingresar con Google
      </button>
    </div>
  );
};
