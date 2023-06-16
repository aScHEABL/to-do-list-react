import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  createStyles
} from '@mantine/core';

import { BsCheck2All } from "react-icons/bs";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundImage: "url('https://media.discordapp.net/attachments/1119244481808576543/1119244483536629840/image.png')"
  }
}))

export default function AppContainer() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      classNames={{
        root: classes.root
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} bg="transparent">
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={{ base: 'fit-content' }} bg="transparent">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '16px' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                p="sm"
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="lg"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }
    >
    </AppShell>
  );
}