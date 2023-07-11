import React, { useState, useContext, useEffect } from "react";
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
 import { v4 as uuid } from 'uuid';

interface TaskModalProps {
    isModalOpened: boolean;
    columnID: string;
    closeModal: () => void;
}

interface Task {
    id: string;
    title: string;
    category: string;
    priority: string;
    ifInputError: boolean | string;
    dueDate: Date;
}

let ifInputBefore = false;

export default function TaskModal({ isModalOpened, columnID, closeModal }: TaskModalProps) {
    const initialTask: Task = {
        id: uuid(),
        title: "",
        category: "",
        dueDate: new Date(),
        priority: "medium",
        ifInputError: false,
    }

    const [task, setTask] = useState(initialTask);
    const { state, dispatch } = useContext(AppContext);
    function handleClick(btnAction: string) {
        switch (btnAction) {
            case "ADD_TASK":
                if (task.title.length === 0) {
                    return;
                }
                const newTask = {
                    id: task.id,
                    title: task.title,
                    category: task.category,
                    dueDate: task.dueDate,
                    priority: task.priority,
                  }
                  dispatch({ type: "ADD_TASK", payload: { columnID, newTask } });
                  closeModal();
                  ifInputBefore = false;
                  setTask({
                    id: uuid(),
                    title: "",
                    category: "",
                    dueDate: new Date(),
                    priority: "medium",
                    ifInputError: false,
                  })
                break;
            default:
                break;
        }
    }

    function handleChange(eventName: string, eventValue: any) {
        setTask({ ...task, [eventName]: eventValue });
    }

    useEffect(() => {
        if (task.title.length === 0 && ifInputBefore === true) setTask({ ...task, ifInputError: "You must fill this field!" })
        else {
            setTask({ ...task, ifInputError: false });
            ifInputBefore = true;
        }
    }, [task.title])
    return (
        <Modal opened={isModalOpened} onClose={closeModal} title="Add Task" centered>
            <Flex wrap="wrap" gap={25}>
            <Box 
            sx={(theme) => ({
                flex: "1 1 45%"
            })}
            >
                <TextInput
                value={task.title}
                name="title"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Write your task here"
                label="Task Title"
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
                name="dueDate"
                popoverProps={{ withinPortal: true }}
                clearable={true}
                value={task.dueDate}
                onChange={(e) => handleChange("dueDate", e)}
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
                <Button variant={ task.priority === "low" ? "filled" : "outline" } name="priority" color="teal" uppercase
                value="low" onClick={() => setTask({ ...task, priority: "low" })}
                >LOW</Button>
                <Button variant={ task.priority === "medium" ? "filled" : "outline" } name="priority" color="yellow" uppercase
                value="medium" onClick={() => setTask({ ...task, priority: "medium" })}
                >MEDIUM</Button>
                <Button variant={ task.priority === "high" ? "filled" : "outline" } name="priority" color="red" uppercase
                value="high" onClick={() => setTask({ ...task, priority: "high" })}
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