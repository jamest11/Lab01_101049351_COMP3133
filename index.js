// COMP 3133 Exercise 1
// James Tor¥ - 101049351

const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const csv = require('csv-parser');
const fs = require('fs');

const csvStringifier = createCsvStringifier({ 
  header: [
    {id:'country', title:'country'},
    {id:'year', title:'year'},
    {id:'population', title:'population'}
  ]
});

const canWriterStream = fs.createWriteStream('canada.txt');
const usaWriterStream = fs.createWriteStream('usa.txt');

canWriterStream.write(csvStringifier.getHeaderString());
usaWriterStream.write(csvStringifier.getHeaderString());

fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
    if(row.country === 'Canada') {
      canWriterStream.write(csvStringifier.stringifyRecords([row]))
    }
    else if(row.country === 'United States') {
      usaWriterStream.write(csvStringifier.stringifyRecords([row]))
    }
  })
  .on('end', () => {
    canWriterStream.end();
    usaWriterStream.end();
  });


