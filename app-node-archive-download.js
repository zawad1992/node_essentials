// Node.js Project Setup Instructions:
// 1. Create a new directory for your project.
// 2. Navigate to your project directory in the terminal.
// 3. Initialize a new Node.js project with `npm init`. Follow the prompts to create a package.json file.
// 4. Install the necessary Node modules using the following commands:
//    - `npm install express`
//    - `npm install archiver`
// 5. Create a file named `app.js` and copy this code into it.
// 6. Run the application using `node app.js`.
// 7. Access the application by navigating to `http://localhost:3000/node-practice` in a web browser.

// Import necessary modules
const fs = require('fs');                  // File system module for file operations
const archiver = require('archiver');      // Archiver module for zipping files
const express = require('express');        // Express framework for handling HTTP requests
const app = express();                     // Create an Express application
const path = require('path');              // Path module for file path operations

/**
 * Function to zip a directory.
 * @param {string} source - The path of the directory to be zipped
 * @param {string} out - The output path for the zipped file
 * @returns {Promise} - A Promise that resolves when zipping is complete
 */
function zipDirectory(source, out) {
  const archive = archiver('zip', { zlib: { level: 9 }});  // Create a zip archiver
  const stream = fs.createWriteStream(out);                // Create a writable stream

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)  // Add the directory to the archive
      .on('error', err => reject(err))  // Handle errors
      .pipe(stream);  // Pipe the archive data to the stream

    stream.on('close', () => resolve());  // Resolve the promise when the stream is closed
    archive.finalize();  // Finalize the archive (this is what triggers the archiving process)
  });
}

// Set up a route for HTTP GET requests to '/node-practice'
app.get('/node-practice', async function(req, res) {
  const directoryPath = 'D:\\Project\\VueJS\\Practice0002';  // Set the directory to be zipped
  const zipPath = path.join(__dirname, 'node_practice.zip');  // Set the output path for the zip file

  await zipDirectory(directoryPath, zipPath);  // Zip the directory

  res.download(zipPath);  // Send the zipped file to the client
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});
