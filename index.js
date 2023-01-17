// COMP 3133 Exercise 1
// James Tory - 101049351

const csv = require('csv-parser');
const fs = require('fs');

const canWriterStream = fs.createWriteStream('canada.txt');
const usaWriterStream = fs.createWriteStream('usa.txt');

fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('headers', (headers) => {
    const header = headers.join(',') + '\n'
    canWriterStream.write(header);
    usaWriterStream.write(header);
  })
  .on('data', (row) => {
    if(row.country === 'Canada') {
      canWriterStream.write(`${row.country},${row.year},${row.population}\n`);
    }
    else if(row.country === 'United States') {
      usaWriterStream.write(`${row.country},${row.year},${row.population}\n`);
    }
  })
  .on('end', () => {
    canWriterStream.end();
    usaWriterStream.end();
  });


