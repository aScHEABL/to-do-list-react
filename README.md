# To Do List

[Live Demo](https://ascheabl.github.io/to-do-list-react/)

1. When using localstorage, must remove <StrictMode>, for details [check here](https://www.bilibili.com/read/cv18443012/) <br>
2. [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) works in JSX expression, useful when one needs to condintional rendering component without the use of [conditional ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) <br>
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