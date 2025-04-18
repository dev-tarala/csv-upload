const fs = require('fs');
const csv =  require('csv-parser');
const path = require('path');

// File path
const filePath = path.join(__dirname, '../data/demo.csv');

const readCSVContent = (filePath: string): Promise<object[]> => {
    const content: object[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: any) => content.push(data))
            .on('end', () => resolve(content))
            .on('error', (error: any) => reject(error));
    });
}

readCSVContent(filePath)
    .then((data) => {
        console.log('CSV data', data); 
    })
    .catch((error) => {
        console.error('error', error);
    });
