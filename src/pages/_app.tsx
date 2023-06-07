import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { MantineProvider, ColorSchemeProvider, type ColorScheme } from "@mantine/core";
import { useState } from "react";
import { Notifications } from '@mantine/notifications';
import { UserProvider } from "~/contexts/UserTypeRoleContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <UserProvider>
        <MantineProvider
          theme={{
            components: {
              ActionIcon: {
                sizes: {
                  lg: () => ({
                    root: {
                      width: 36,
                      height: 36,
                    }
                  })
                },
              },
            },
            colorScheme
          }} withGlobalStyles withNormalizeCSS>
          <SessionProvider session={session}>
            <Notifications />
            <Component {...pageProps} />
          </SessionProvider>
        </MantineProvider>
      </UserProvider>
    </ColorSchemeProvider>
  );
};

export default api.withTRPC(MyApp);
