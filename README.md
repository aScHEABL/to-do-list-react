# To Do List

[Live Demo](https://ascheabl.github.io/to-do-list-react/)

1. When using localstorage, must remove <StrictMode>, for details [check here](https://www.bilibili.com/read/cv18443012/). <br>
2. [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) works in JSX expression, useful when one needs to condintional rendering component without the use of [conditional ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator). <br>
```jsx
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
```
3. popoverProps in <DateInput> with [mantine UI](https://mantine.dev/), when the select date window size exceeds <Modal>, it needs this property to ignore the parent component to show its full size. <br>
```jsx
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
```

4. Because I push the state into the localStorage then retrieve it to render them, I doubt the `task.dueDate` type is still     string because of it, will need to investigate further. If true, I'll need to convert it back from string to date, will need to investigate further. <br>
