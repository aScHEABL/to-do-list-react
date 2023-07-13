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
    modalType?: string;
    isModalOpened: boolean;
    closeModal: () => void;
    columnID: string;
    itemID?: string;
}

interface Task {
    id: string;
    title: string;
    category: string;
    priority: string;
    ifInputError: boolean | string;
    dueDate: Date;
}

export default function TaskModalExperimental({ modalType, isModalOpened, columnID, closeModal, itemID }: TaskModalProps) {
    return (
        <>
            { (() => {
                if (modalType === "ADD_TASK") {
                    return (<AddTask isModalOpened={isModalOpened} columnID={columnID} closeModal={closeModal} />)
                } else if (modalType === "EDIT_TASK") {
                    return (<EditTask isModalOpened={isModalOpened} columnID={columnID} closeModal={closeModal} itemID={itemID} />)
                }
            })() }
        </>
    )
}

function AddTask({ isModalOpened, columnID, closeModal }: TaskModalProps) {
    const [ifInputBefore, setInputBefore] = useState(false);
    const initialTask: Task = {
        id: uuid(),
        title: "",
        category: "personal",
        dueDate: new Date(),
        priority: "medium",
        ifInputError: false,
    }

    const [task, setTask] = useState(initialTask);
    const { state, dispatch } = useContext(AppContext);
    function handleAddBtnClick() {
            if (task.title.length === 0) {
                setTask({ ...task, ifInputError: "You must fill in this field!" })
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
                setInputBefore(false);
                setTask({
                id: uuid(),
                title: "",
                category: "",
                dueDate: new Date(),
                priority: "medium",
                ifInputError: false,
                })
    }

    function handleChange(eventName: string, eventValue: any) {
        setTask({ ...task, [eventName]: eventValue });
    }

    useEffect(() => {
        if (task.title.length === 0 && ifInputBefore === true) setTask({ ...task, ifInputError: "You must fill this field!" })
        else {
            setTask({ ...task, ifInputError: false });
            setInputBefore(true);
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
                value={task.category}
                onChange={(e) => setTask({ ...task, category: String(e) })}
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
                <Button onClick={() => handleAddBtnClick()}>ADD</Button>
            </Flex>
            </Flex>
        </Modal>
    )
}

function EditTask({ isModalOpened, columnID, closeModal, itemID }: TaskModalProps) {
    const { state, dispatch } = useContext(AppContext);
    const [task, setTask] = useState<Task>({} as Task);

    // function handleChange(targetName: string, targetValue: string) {
    //     setTask({ ...task, [targetName]: targetValue });
    //     // console.log(task);
    // }

    function handleSaveBtnClick() {
        dispatch({ type: "EDIT_TASK", payload: { columnID: columnID, taskID: task.id, updatedTask: task } })
    }
    
    useEffect(() => {
        const taskFromContext = state.columns[columnID].items.find((item) => item.id === itemID);
        setTask(Object(taskFromContext));
    }, [itemID])

    // useEffect(() => {
    //     dispatch({ type: "EDIT_TASK", payload: { columnID: columnID, taskID: task.id, updatedTask: task } })
    //     console.log(state.columns);
    // }, [task])

    return (
        <Modal opened={isModalOpened} onClose={closeModal} title="Edit Task" centered>
            <Flex wrap="wrap" gap={25}>
            <Box 
            sx={(theme) => ({
                flex: "1 1 45%"
            })}
            >
                <TextInput
                    value={task.title || ""}
                    name="title"
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    placeholder="Write your task here"
                    label="Task Title"
                    error={(!task.title) ? "You must fill in this field!" : false} // "This field can't be emptied!"
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
                value="personal"
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
                    onChange={(e: Date) => setTask({ ...task, dueDate: e })}
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
                <Button variant={(task.priority === "low") ? "filled" : "outline"} name="priority" color="teal" uppercase
                value="low" onClick={() => setTask({ ...task, priority: "low" })}
                >LOW</Button>
                <Button variant={(task.priority === "medium") ? "filled" : "outline"} name="priority" color="yellow" uppercase
                value="medium" onClick={() => setTask({ ...task, priority: "medium" })}
                >MEDIUM</Button>
                <Button variant={(task.priority === "high") ? "filled" : "outline"} name="priority" color="red" uppercase
                value="high" onClick={() => setTask({ ...task, priority: "high" })}
                >HIGH</Button>
                </Flex>
            </Box>
            <Flex w="100%" justify="flex-end">
                <Button onClick={() => handleSaveBtnClick()}>Save</Button>
            </Flex>
            </Flex>
        </Modal>
    )
}