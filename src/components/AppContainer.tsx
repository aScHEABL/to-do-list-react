import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  createStyles,
  Flex,
  List,
  Divider
} from '@mantine/core';

import { TbClipboardList } from "react-icons/tb";
import { BsCalendarEvent, BsCalendarWeek, BsCalendar3, BsTrash } from "react-icons/bs";

const useStyles = createStyles((theme) => ({
  appShellRoot: {
    backgroundImage: "url('https://media.discordapp.net/attachments/1119244481808576543/1119244483536629840/image.png')",
  },
}))

export default function AppContainer() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      classNames={{
        root: classes.appShellRoot
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250 }} height="100%" bg="transparent" 
        style={{ border: '1px solid', borderRadius: '32px' }}>
          <Text fz="1.5rem" color="white" fw="bold">Filters</Text>
          <List size="xl" display="flex" center style={{ flexWrap: "wrap", color: "white", rowGap: "16px", padding: "5%" }}>
            <List.Item icon={<TbClipboardList />} style={{ width: "100%" }}>
              All Tasks
            </List.Item>
            <List.Item icon={<BsCalendarEvent />} style={{ width: "100%" }}>
              Today
            </List.Item>
            <List.Item icon={<BsCalendarWeek />} style={{ width: "100%" }}>
              Next 7 Days
            </List.Item>
            <List.Item icon={<BsCalendar3 />} style={{ width: "100%" }}>
              Calendar View
            </List.Item>
            <List.Item icon={<BsTrash />} style={{ width: "100%" }}>
              Trash
            </List.Item>
          </List>
          <Divider my="xs" color="gray" size="md" variant="solid" labelPosition="center" />
        </Navbar>
      }
      header={
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Header height={{ base: '50' }} bg="transparent">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Burger
                p="sm"
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="lg"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </div>
          </Header>
        </MediaQuery>
      }
    >
    </AppShell>
  );
}