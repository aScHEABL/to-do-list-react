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
  Divider,
  Button,
  Grid
} from '@mantine/core';

import { TbClipboardList } from "react-icons/tb";
import { BsCalendarCheck, BsCalendar3, BsTrash } from "react-icons/bs";
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4'

const useStyles = createStyles((theme) => ({
  appShellRoot: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: "url('https://media.discordapp.net/attachments/1119244481808576543/1119244483536629840/image.png')",
  },
  btnLink: {
    flex: "1 1 100%", 
    color: "white",
    '&:not([data-disabled])': theme.fn.hover({
      backgroundColor: "rgba(245, 245, 245, 0.3)"
    }),
  }, 
  btnTag: {
    color: "white",
    backgroundColor: "rgba(245, 245, 245, 0.4)",
    '&:not([data-disabled])': theme.fn.hover({
      backgroundColor: "rgba(117, 117, 117, 0.5)"
    }),
  }, 
  btnInner: {
    justifyContent: "start",
  }
}))

const tags = ["programming", "dental", "healthcare", "sports", "work"]
const tagArray = tags.map((item) => {
  return {
    id: uuidv4(),
    value: item
  }
})

export default function TaskPage() {
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
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250 }} height="90%" bg="transparent" 
        style={{ border: '4px solid', borderRadius: '32px' }}>
          <Text fz="1.5rem" color="white" fw="bold">Filters</Text>
          <Flex wrap="wrap">
            <Button size="xl" leftIcon={<BsCalendarCheck />} variant="subtle" 
            classNames={{ root: classes.btnLink, inner: classes.btnInner }}>Tasks</Button>
            <Button size="xl" leftIcon={<BsCalendar3 />} variant="subtle" 
            classNames={{ root: classes.btnLink, inner: classes.btnInner }}>Calendar View</Button>
            <Button size="xl" leftIcon={<BsTrash />} classNames={{ root: classes.btnLink, inner: classes.btnInner }} variant="subtle">Trash</Button>
          </Flex>
          <Divider my="lg" color="gray" size="md" variant="solid" labelPosition="center" />
          <Flex wrap="wrap" gap={12}>
            {/* {tagArray.map((item) => (
              <Button classNames={{ root: classes.btnTag }} compact variant="subtle" size="md" radius="sm">{item}</Button>
            ))} */}
          </Flex>
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
      <Grid style={{ height: "100%" }} justify="space-between">
        <Grid.Col lg={5} style={{ border: '4px solid', borderRadius: "16px", }}>
          <Text>To Do List</Text>
        </Grid.Col>
        <Grid.Col lg={5} style={{ border: '4px solid', borderRadius: "16px" }} span="auto">
          <Text>In Progress</Text>
        </Grid.Col>
        <Grid.Col lg={5} style={{ border: '4px solid', borderRadius: "16px" }} span="auto">
          <Text>Completed</Text>
        </Grid.Col>
      </Grid>
    </AppShell>
  );
}