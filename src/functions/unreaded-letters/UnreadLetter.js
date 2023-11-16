
const UnreadLetter = async (setLength) => {
    try {
        const storedLength = localStorage.getItem('inboxLength');

        if (storedLength) {
            setLength(parseInt(storedLength, 10));
        }

    } catch (error) {
        console.error('Error fetching unread mails:', error);
    }
};

export default UnreadLetter;
