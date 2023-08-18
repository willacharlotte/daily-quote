const fs = require('fs');
const uuid = require('uuid'); // For generating unique IDs

// Read the original JSON data from a file
fs.readFile('quotes.json', 'utf8', (readErr, data) => {
    if (readErr) {
        console.error('Error reading original data:', readErr);
        return;
    }

    try {
        const originalData = JSON.parse(data);

        // Reformat and generate unique IDs and dates
        const reformattedData = originalData.map((item, index) => ({
            PutRequest: {
                Item: {
                    "Id": { "S": uuid.v4() }, // Generate a unique ID
                    "Date": { "S": generateUniqueDate(index) }, // Generate a unique date
                    "Author": { "S": item.author },
                    "Quote": { "S": item.quote }
                }
            }
        }));

        // Convert reformatted data to JSON format
        const formattedJSON = JSON.stringify({ "DailyQuotes": reformattedData }, null, 4);

        // Write the formatted JSON to a text file
        fs.writeFile('reformatted_data.json', formattedJSON, 'utf8', writeErr => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
            } else {
                console.log('File "reformatted_data.json" written successfully.');
            }
        });
    } catch (parseErr) {
        console.error('Error parsing original data:', parseErr);
    }
});

// Function to generate unique dates based on an index
function generateUniqueDate(index) {
    const today = new Date();
    today.setDate(today.getDate() + index); // Increment the date based on the index
    const formattedDate = today.toISOString().substr(0, 10); // Format as "YYYY-MM-DD"
    return formattedDate;
}