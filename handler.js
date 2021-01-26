'use strict';
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list = async () => {
    try {
        const result = await dynamoDb.scan(params).promise();
        console.info("result found", params, JSON.stringify(result.Items));
        return {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
    } catch (error) {
        // handle potential errors
        console.error(error);
        return {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the todos.',
        };
    }
};

