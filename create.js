const uuid = require('uuid');
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event) => {
    const data = JSON.parse(event.body);

    const item = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            item: data.item
        },
    };
    try {
        await dynamoDb.put(item).promise();
        return {
            statusCode: 200,
            body: "Successful",
        };
    } catch (error) {
        // handle potential errors
        console.error(error);
        return {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t add item to todos.',
        };
    }
};
