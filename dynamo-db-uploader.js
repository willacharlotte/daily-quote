const fs = require('fs');
const AWS = require('aws-sdk');
const uuid = require('uuid');

// Configure AWS credentials and region
AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'af-south-1' // Change to your desired region
});

// Read the original JSON data from a file
fs.readFile('quotes.json', 'utf8', async (readErr, data) => {
    if (readErr) {
        console.error('Error reading original data:', readErr);
        return;
    }

    try {
        const originalData = JSON.parse(data);
        const chunkSize = 25; // Maximum number of items in a single BatchWriteItem request

        // Split data into chunks
        const dataChunks = [];
        for (let i = 0; i < originalData.length; i += chunkSize) {
            dataChunks.push(originalData.slice(i, i + chunkSize));
        }

        const dynamodb = new AWS.DynamoDB();

        // Iterate through each chunk and make BatchWriteItem requests
        for (const chunk of dataChunks) {
            const reformattedData = chunk.map(item => ({
                PutRequest: {
                    Item: {
                        "Id": { "S": uuid.v4() },
                        "Date": { "S": generateUniqueDate() },
                        "Author": { "S": item.author },
                        "Quote": { "S": item.quote }
                    }
                }
            }));

            const params = {
                RequestItems: {
                    "DailyQuotes": reformattedData
                }
            };

            try {
                await dynamodb.batchWriteItem(params).promise();
                console.log('BatchWriteItem successful for a chunk of data.');
            } catch (batchErr) {
                console.error('Error in BatchWriteItem:', batchErr);
            }
        }
    } catch (parseErr) {
        console.error('Error parsing original data:', parseErr);
    }
});

// Function to generate a unique date
function generateUniqueDate() {
    const today = new Date();
    const formattedDate = today.toISOString().substring(0, 10); // Format as "YYYY-MM-DD"
    return formattedDate;
}