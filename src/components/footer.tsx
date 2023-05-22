import { createStyles, Group, ActionIcon } from '@mantine/core';
import { IconBrandFacebook, IconBrandDiscord, IconBrandInstagram } from '@tabler/icons-react';
import { Logo } from './logo';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.md}`,
    backgroundColor: theme.colorScheme === "dark" ? "#1C2333" : '#FFFFFF',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export const Footer = () => {
  const { classes } = useStyles();

  return (
      <div className={classes.inner}>
        <Logo width={40} height={40}/>

        <Group className={classes.links}>
          <Link href="/about" passHref className="hover:text-gray-200">Sobre Nosotros</Link>
          <Link href="/" passHref className="hover:text-gray-200">Inicio</Link>
          <Link href="/contact-us" passHref className="hover:text-gray-200">Contactanos</Link>
        </Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandFacebook size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandDiscord size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
  );
}