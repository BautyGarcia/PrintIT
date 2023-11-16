/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Logo } from "../Logos/logo";
import Link from "next/link";
import SchemeButton from "./schemeButton";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export const LandingHeader: React.FC = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <Header
        height={60}
        px="md"
        className={
          colorScheme === "dark" ? "fixed bg-[#1C2333]" : "fixed bg-white"
        }
      >
        <Group position="apart" sx={{ height: "100%" }}>
          <Link className="flex flex-row items-center gap-2" href="/" passHref>
            <Logo width={40} height={40} />
          </Link>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link href="/about" className={classes.link}>
              Sobre Nosotros
            </Link>
            <Link href="/" className={classes.link}>
              Inicio
            </Link>
            <Link href="/contact-us" className={classes.link}>
              Contactanos
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            <SchemeButton />
            <Link href="/signIn" passHref>
              <Button variant="default">Ingresar</Button>
            </Link>
            <Link href="/signUp" passHref>
              <Button variant="undefined" className="bg-indigo-400 text-white">
                Crear Cuenta
              </Button>
            </Link>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link href="/about" className={classes.link}>
            Sobre Nosotros
          </Link>
          <Link href="/" className={classes.link}>
            Inicio
          </Link>
          <Link href="/contact-us" className={classes.link}>
            Contactanos
          </Link>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="apart">
            <Group position="left" pb="lg" px="sm">
              <Link href="/signIn" passHref>
                <Button variant="default">Iniciar Sesión</Button>
              </Link>
              <Link href="/signUp" passHref>
                <Button
                  variant="undefined"
                  className="bg-indigo-400 text-white"
                >
                  Crear Cuenta
                </Button>
              </Link>
            </Group>
            <Group position="right" pb="lg" px="md">
              <SchemeButton />
            </Group>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
};
