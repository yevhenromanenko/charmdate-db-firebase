
const HandleTagButtonClick = (tag, fieldType, setText, text, inputRef) => {
    if (!inputRef || !inputRef.current) {
        // Handle the case where inputRef is not available
        return;
    }

    const input = inputRef.current;
    const startPosition = input.selectionStart;
    const endPosition = input.selectionEnd;

    const newText =
        text.substring(0, startPosition) + `${tag}` + text.substring(endPosition);

    setText(newText);

    // Move the cursor to the end of the inserted tag
    const newCursorPosition = startPosition + `${tag}`.length;
    input.setSelectionRange(newCursorPosition, newCursorPosition);
};

export default HandleTagButtonClick;
