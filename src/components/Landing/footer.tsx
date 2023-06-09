import { createStyles, Group, ActionIcon } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandDiscord,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { Logo } from "../Logos/logo";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md} ${theme.spacing.md}`,
    backgroundColor: theme.colorScheme === "dark" ? "#1C2333" : "#FFFFFF",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.inner}>
      <Group className="flex flex-row items-center gap-4">
        <Link className="flex flex-row items-center gap-2" href="/" passHref>
          <Logo width={40} height={40} />
        </Link>
      </Group>

      <Group className={classes.links}>
        <Link href="/about" passHref className="hover:text-gray-200">
          Sobre Nosotros
        </Link>
        <Link href="/" passHref className="hover:text-gray-200">
          Inicio
        </Link>
        <Link href="/contact-us" passHref className="hover:text-gray-200">
          Contactanos
        </Link>
      </Group>

      <Group spacing="xs" position="right" noWrap>
        <ActionIcon size="lg" variant="default" radius="xl">
          <Link href="https://es-la.facebook.com" target="_blank">
            <IconBrandFacebook size="1.05rem" stroke={1.5} />
          </Link>
        </ActionIcon>
        <ActionIcon size="lg" variant="default" radius="xl">
          <Link href="https://www.instagram.com" target="_blank">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </Link>
        </ActionIcon>
        <ActionIcon size="lg" variant="default" radius="xl">
          <Link href="https://discord.com" target="_blank">
            <IconBrandDiscord size="1.05rem" stroke={1.5} />
          </Link>
        </ActionIcon>
      </Group>
    </div>
  );
};
