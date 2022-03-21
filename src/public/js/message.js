export default (header, content) => {
    return (JSON.stringify({
        header,
        content
    }));
}