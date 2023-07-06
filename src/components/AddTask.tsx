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

export default function AddTaskModal({ isModalOpened, columnID, closeModal }: AddTaskModalProps) {

    const [activePriority, setActivePriority] = useState("medium" as string);
    const [taskName, setTaskName] = useState("" as string);
    const [ifInputError, setInputError] = useState<boolean | string>(false);
    const [dateValue, setDateValue] = useState<Date | null>(new Date());
    const { state, dispatch } = useContext(AppContext);
    function handleClick(btnAction: string) {
        console.log(columnID);
        switch (btnAction) {
            case "ADD_TASK":
                if (!taskName) {
                    setInputError("You must fill this field!");
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

    function handleChange(e: any) {
        setInputError(false);
        setTaskName(e.target.value);
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
                value={taskName}
                onChange={(e) => handleChange(e)}
                placeholder="Write your task here"
                label="Task Name"
                error={ifInputError} // "This field can't be emptied!"
                withAsterisk
                />
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
                <DateInput
                popoverProps={{ withinPortal: true }}
                clearable={true}
                value={dateValue}
                onChange={setDateValue}
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
                <Button variant={ activePriority === "low" ? "filled" : "outline" } color="teal" uppercase
                value="low" onClick={() => setActivePriority("low")}
                >LOW</Button>
                <Button variant={ activePriority === "medium" ? "filled" : "outline" } color="yellow" uppercase
                value="medium" onClick={() => setActivePriority("medium")}
                >MEDIUM</Button>
                <Button variant={ activePriority === "high" ? "filled" : "outline" } color="red" uppercase
                value="high" onClick={() => setActivePriority("high")}
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