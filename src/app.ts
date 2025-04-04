/**
 * CSV File Reader Application
 * 
 * This application reads data from a CSV file and outputs it to the console.
 * It demonstrates how to read CSV files asynchronously using Node.js streams.
 */

// Import required dependencies
const fs = require('fs');           // File system module for file operations
const csv = require('csv-parser');  // CSV parser library to parse CSV content
const path = require('path');       // Path module for handling file paths

// Define the path to the CSV file relative to the current file location
const filePath = path.join(__dirname, '../data/demo.csv');

/**
 * Reads and parses a CSV file
 * 
 * @param {string} filePath - Path to the CSV file to be read
 * @returns {Promise<object[]>} - Promise that resolves with an array of objects representing CSV rows
 */
const readCSVContent = (filePath: string): Promise<object[]> => {
    // Array to store parsed CSV content
    const content: object[] = [];

    // Return a Promise to handle asynchronous file reading
    return new Promise((resolve, reject) => {
        // Create a readable stream from the file
        fs.createReadStream(filePath)
            // Pipe the stream through csv-parser to convert CSV to objects
            .pipe(csv())
            // Event handler for each row of data
            .on('data', (data: any) => content.push(data))
            // Event handler for when reading is complete
            .on('end', () => resolve(content))
            // Event handler for any errors during reading
            .on('error', (error: any) => reject(error));
    });
}

// Execute the CSV reading function
readCSVContent(filePath)
    .then((data) => {
        // Success: Log the parsed CSV data to the console
        console.log('CSV data', data); 
    })
    .catch((error) => {
        // Error: Log any errors that occurred during reading
        console.error('error', error);
    });