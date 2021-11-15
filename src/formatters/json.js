const JSONFormatter = (field, spaceAmount = 2) => JSON.stringify(field, null, ' '.repeat(spaceAmount));

export default JSONFormatter;
