import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  MediaQuery,
} from "@mantine/core";
import {
  IconPrinter,
  IconShovel,
  IconLogout,
  IconFile3d,
  IconPackage,
  IconMessage,
} from "@tabler/icons-react";
import SchemeButton from "../Landing/schemeButton";
import { signOut } from "next-auth/react";
import Link from "next/link";
import PrinterPopup from "~/components/Dashboard/addPrinterPopup";
import { useRouter } from "next/router";
import UserToggle from "./userToggleButton";
import { api } from "~/utils/api";
import { usePathname } from "next/navigation";
import useRoleType from "~/hooks/useRoleType";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.xs} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    display: "block",
    textAlign: "center",
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    display: "flex",
    justifyContent: "space-between",
  },

  addPrinter: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: "#FFF",
    backgroundColor: "#3B82F6",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.md,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: "#3B82F6",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  addPrinterIcon: {
    ref: getStylesRef("icon"),
    color: "#FFF",
    marginRight: theme.spacing.sm,
  },

  community: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? "#FFFFFF" : "#717171",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: "6px",
    fontWeight: 500,
    border: `1px solid ${theme.colorScheme === "dark" ? "#FFFFFF" : "#717171"}`,
    height: "44px",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  communityIcon: {
    ref: getStylesRef("icon"),
    color: theme.colorScheme === "dark" ? "#FFFFFF" : "#717171",
    marginRight: theme.spacing.sm,
  },

  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const HomeNavBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname().split("/")[2];
  const { classes, cx } = useStyles();
  const { refetch: getMyPrinters } = api.printer.getMyPrinters.useQuery();
  const [userTypeRole, setUserTypeRole] = useRoleType('Cliente');

  return (
    <>
      <Navbar.Section grow className="flex flex-col">
        <div className="flex flex-col h-[100%]">
          <Group className={classes.header} position="apart">
            <PrinterPopup refreshPrinters={getMyPrinters} />
            <Link
              href=""
              className={classes.community}
              onClick={(event) => event.preventDefault()}
            >
              <IconMessage className={classes.communityIcon} />
              <span>Comunidad</span>
            </Link>
          </Group>

          {userTypeRole === "Cliente" && (
            <>
              <Link
                href="/dashboard/subirArchivo"
                className={cx(classes.link, {
                  [classes.linkActive]: "subirArchivo" === pathname,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  void router.push("/dashboard/subirArchivo");
                }}
              >
                <IconFile3d className={classes.linkIcon} stroke={1.5} />
                <span>Subir Archivo</span>
              </Link>

              <Link
                href="/dashboard/misPedidos"
                className={cx(classes.link, {
                  [classes.linkActive]: "misPedidos" === pathname,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  void router.push("/dashboard/misPedidos");
                }}
              >
                <IconPackage className={classes.linkIcon} stroke={1.5} />
                <span>Mis Pedidos</span>
              </Link>
            </>
          )}

          {userTypeRole === "Vendedor" && (
            <>
              <Link
                href="/dashboard/misTrabajos"
                className={cx(classes.link, {
                  [classes.linkActive]: "misTrabajos" === pathname,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  void router.push("/dashboard/misTrabajos");
                }}
              >
                <IconShovel className={classes.linkIcon} stroke={1.5} />
                <span>Mis Trabajos</span>
              </Link>

              <Link
                href="/dashboard/misImpresoras"
                className={cx(classes.link, {
                  [classes.linkActive]: "misImpresoras" === pathname,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  void router.push("/dashboard/misImpresoras");
                }}
              >
                <IconPrinter className={classes.linkIcon} stroke={1.5} />
                <span>Mis Impresoras</span>
              </Link>
            </>
          )}
        </div>
        <UserToggle userTypeRole={userTypeRole} setUserTypeRole={setUserTypeRole} />
      </Navbar.Section>

      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Navbar.Section className={classes.footer}>
          <Link
            href="/"
            className={classes.link}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Link>
          <Group className="flex justify-end">
            <SchemeButton />
          </Group>
        </Navbar.Section>
      </MediaQuery>
    </>
  );
};

export default HomeNavBar;
