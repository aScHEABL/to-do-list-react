import React, { useState, useContext } from "react";
import { 
    Flex,
    Button,
    Box,
    TextInput,
    Modal,
    Text,
    Select
 } from "@mantine/core";

 import { DateInput } from '@mantine/dates';
 import { AppContext } from '../AppContext';

interface AddTaskModalProps {
    isModalOpened: boolean;
    columnID: string;
    closeModal: () => void;
}

interface Task {
    activePriority: string;
    name: string,
    ifInputError: boolean | string;
    dateValue: Date;
}

export default function AddTaskModal({ isModalOpened, columnID, closeModal }: AddTaskModalProps) {
    const initialTask: Task = {
        activePriority: "medium",
        name: "",
        ifInputError: false,
        dateValue: new Date()
    }

    const [task, setTask] = useState(initialTask);
    const { state, dispatch } = useContext(AppContext);
    function handleClick(btnAction: string) {
        console.log(columnID);
        switch (btnAction) {
            case "ADD_TASK":
                if (!task.name) {
                    setTask({ ...task, ifInputError: "You must fill this field!" });
                    return;
                }
                // const task = {
                //     id: String(Date.now()),
                //     title: newTaskTitle,
                //     dueDate: newTaskDueDate,
                //     priority: newTaskPriority,
                //   };
                //   dispatch({ type: "ADD_TASK", payload: { columnId, task } });
                break;
            default:
                break;
        }
    }

    function handleChange(eventName: string, eventValue: any) {
        if (eventName === "name") setTask({ ...task, ifInputError: false });
        setTask({ ...task, [eventName]: eventValue });
        console.log(task);
    }
    return (
        <Modal opened={isModalOpened} onClose={closeModal} title="Add Task" centered>
            <Flex wrap="wrap" gap={25}>
            <Box 
            sx={(theme) => ({
                flex: "1 1 45%"
            })}
            >
                <TextInput
                value={task.name}
                name="name"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Write your task here"
                label="Task Name"
                error={task.ifInputError} // "This field can't be emptied!"
                withAsterisk
                />
            </Box>
            <Box
            sx={(theme) => ({
                flex: "1 1 45%"
            })}>
            <Select
                name="category"
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
                <DateInput
                name="dateValue"
                popoverProps={{ withinPortal: true }}
                clearable={true}
                value={task.dateValue}
                onChange={(e) => handleChange("dateValue", e)}
                label="Due Date"
                placeholder="Date input"
                maw={400}
                mx="auto"
                />
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
                <Button variant={ task.activePriority === "low" ? "filled" : "outline" } name="priority" color="teal" uppercase
                value="low" onClick={() => setTask({ ...task, activePriority: "low" })}
                >LOW</Button>
                <Button variant={ task.activePriority === "medium" ? "filled" : "outline" } name="priority" color="yellow" uppercase
                value="medium" onClick={() => setTask({ ...task, activePriority: "medium" })}
                >MEDIUM</Button>
                <Button variant={ task.activePriority === "high" ? "filled" : "outline" } name="priority" color="red" uppercase
                value="high" onClick={() => setTask({ ...task, activePriority: "high" })}
                >HIGH</Button>
                </Flex>
            </Box>
            <Flex w="100%" justify="flex-end">
                <Button onClick={() => handleClick("ADD_TASK")}>ADD</Button>
            </Flex>
            </Flex>
      </Modal>
    )
}