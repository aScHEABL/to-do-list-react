import { useState, useContext, useEffect } from 'react';
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
  Grid,
  Box,
  Badge,
  ActionIcon,
  Modal,
  Input,
  Select,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable, } from '@hello-pangea/dnd';
import { BsCalendarCheck, BsCalendar3, BsTrash, BsPlusLg } from "react-icons/bs";
import { MdDragIndicator } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";

const useStyles = createStyles((theme) => ({
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
  },
  taskIconBtn: {
    "&:hover" : {
      background: "#818b95"
    }
  }
}))

const tags = ["programming", "dental", "healthcare", "sports", "work"]
const tagArray = tags.map((item) => {
  return {
    id: uuid(),
    value: item
  }
})

export default function TaskPage() {
  const { state, dispatch } = useContext(AppContext);
  const [activePriority, setActivePriority] = useState();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [appShellOpened, setAppShellOpened] = useState(false);
  const [isModalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = state.columns[source.droppableId];
      const destColumn = state.columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      dispatch({
        type: "UPDATE_COLUMNS",
        payload: {
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems
          }
        }
      })
    } else {
      const column = state.columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      dispatch({
        type: "UPDATE_COLUMNS",
        payload: {
          [source.droppableId]: {
            ...column,
            items: copiedItems
          }
        }
      })
    }
  }

  function handleClick(btnAction: string) {
    console.log(btnAction);
    switch (btnAction) {
      case "ADD_TASK":
        openModal();
        break;
      case "EDIT_TASK":

        break;
      case "DELETE_TASK":

        break;
      default:
        break;
    }
  }

  function handlePriorityClick(event: any) {
    setActivePriority((prev) => event.target.textContent.toLowerCase());
  }
  
  useEffect(() => {
    const savedState = localStorage.getItem("state");
    if (savedState) dispatch({ type: "SET_STATE", payload: JSON.parse(savedState) });
  }, [])
  
  useEffect(() => {
    window.localStorage.setItem("state", JSON.stringify(state))
  }, [state])
  
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!appShellOpened} width={{ sm: 250 }} height="90%" bg="transparent" 
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
            {tagArray.map((item) => (
              <Button key={item.id} classNames={{ root: classes.btnTag }} compact variant="subtle" size="md" radius="sm">{item.value}</Button>
            ))}
          </Flex>
        </Navbar>
      }
      header={
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Header height={{ base: '50' }} bg="transparent">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Burger
                p="sm"
                opened={appShellOpened}
                onClick={() => setAppShellOpened((o) => !o)}
                size="lg"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </div>
          </Header>
        </MediaQuery>
      }
    >
      <Box top={0} left={0} pos="fixed" 
      sx={(theme) => ({
        height: "100vh",
        width: "100vw",
        zIndex: -1,
        backgroundImage: "url(https://media.discordapp.net/attachments/1119244481808576543/1119244483536629840/image.png)", 
        "&::before": {
          content: "''",
          position: "absolute",
          left: 0, 
          right: 0,
          top: 0,
          bottom: 0,
          background: "rgba(57, 64, 70, 0.5)"
        }
      })} 
       />
      <Modal opened={isModalOpened} onClose={closeModal} title="Add Task" centered>
        <Flex wrap="wrap" gap={25}>
          <Box 
          sx={(theme) => ({
            flex: "1 1 45%"
          })}
          >
            <Text component="label">Task name</Text>
            <Input></Input>
          </Box>
          <Box
          sx={(theme) => ({
            flex: "1 1 45%"
          })}>
          <Select
            withinPortal={true}
            label="Category"
            placeholder="Pick one"
            defaultValue="personal"
            data={[
              { value: 'personal', label: 'Personal' },
              { value: 'work', label: 'Work' },
              { value: 'education', label: 'Education' },
            ]}
          />
          </Box>
          <Box
          sx={(theme) => ({
            flex: "1 1 45%"
          })}
          >
            <Text component="label">Due Date</Text>
            <Input></Input>
          </Box>
          <Box
          sx={(theme) => ({
            flex: "1 1 45%"
          })}
          >

          </Box>
          <Box 
          sx={(theme) => ({
            flex: "1 1 45%"
          })}
          >
            <Text component="label">Priority: </Text>
            <Flex gap={8}>
              <Button variant={ activePriority === "low" ? "filled" : "outline" } color="teal" uppercase
              value="low" onClick={(e) => handlePriorityClick(e)}
              >LOW</Button>
              <Button variant={ activePriority === "medium" ? "filled" : "outline" } color="yellow" uppercase
              value="medium" onClick={(e) => handlePriorityClick(e)}
              >MEDIUM</Button>
              <Button variant={ activePriority === "high" ? "filled" : "outline" } color="red" uppercase
              value="high" onClick={(e) => handlePriorityClick(e)}
              >HIGH</Button>
            </Flex>
          </Box>
        </Flex>
      </Modal>
      <Grid justify="space-around" style={{ height: "100%", gap: "1.5rem" }}>
       <DragDropContext onDragEnd={(result: any) => onDragEnd(result)}>
          {Object.entries(state.columns).map(([id, column]) => {
            return (
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => {
                  return (
                    <Grid.Col 
                    style={{ height: "100%", border: "4px solid", borderRadius: "16px"
                    , paddingBottom: "7%" }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    md={8} lg={3.8}>
                      <Flex justify="space-between" align="center">
                        <Badge style={{ backgroundColor: "rgb(33, 38, 45, 0.7)" }} 
                        size="xl" variant="filled" radius="md">
                          {column.title}: {column.items.length}
                        </Badge>
                        <ActionIcon size="lg" color="cyan" radius="lg" variant="filled"
                        onClick={() => handleClick("ADD_TASK")}>
                          <BsPlusLg />
                        </ActionIcon>
                      </Flex>
                      <Flex direction="column" rowGap={8} sx={(theme) => ({
                        height: "100%",
                        width: "100%",
                        padding: "3%"
                      })}>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <Flex
                                  justify="space-between"
                                  align="center"
                                  gap={6}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  
                                  sx={(theme) => ({
                                    userSelect: "none",
                                    padding: 16,
                                    minHeight: "50px",
                                    color: "white",
                                    ...provided.draggableProps.style,
                                    borderRadius: theme.radius.sm,
                                    backgroundColor: "rgba(2, 14, 23, 0.7)",
                                    '&:hover': {
                                      backgroundColor: "rgba(2, 14, 23, 0.8)",
                                    },
                                  })}
                                  > 
                                  <Flex align="center" {...provided.dragHandleProps}>
                                    <MdDragIndicator size="2rem" />
                                  </Flex>
                                  <Flex justify="flex-start"
                                  sx={(theme) => ({
                                    flex: "1 1 80%"
                                  })}>
                                    <Text fz="lg">
                                      {item.title}
                                    </Text>
                                  </Flex>
                                  <Flex gap={6}>
                                    <ActionIcon className={ classes.taskIconBtn }
                                    onClick={() => handleClick("EDIT TASK")}
                                    >
                                      <AiOutlineEdit size="1.5rem" />
                                    </ActionIcon>
                                    <ActionIcon className={ classes.taskIconBtn }
                                    onClick={() => handleClick("DELETE TASK")}
                                    >
                                      <IoMdClose size="1.5rem" />
                                    </ActionIcon>
                                  </Flex>
                                  </Flex>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </Flex>
                    </Grid.Col>
                  )
                }}
              </Droppable>
            )
          })}
       </DragDropContext>
      </Grid>
    </AppShell>
  );
}