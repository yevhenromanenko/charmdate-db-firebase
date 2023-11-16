
function GetRandomIndexes(length, n) {
    const indexes = [];
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * length);
        indexes.push(randomIndex);
    }
    return indexes;
}

export default GetRandomIndexes;
