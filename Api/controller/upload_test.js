var express = require('express');
var router = express.Router();
// const Multer = require('multer');

// /* GET users listing. */
// router.post('/', function(req, res, next) {
// console.log(req.files);
// let path = req.files.name;
// this.uploadFile(path);
//   res.send('upload');
// });

// // Imports the Google Cloud client library
// const {Storage} = require('@google-cloud/storage');

// // For more information on ways to initialize Storage, please see
// // https://googleapis.dev/nodejs/storage/latest/Storage.html

// // Creates a client using Application Default Credentials
// const storage = new Storage();

// // Creates a client from a Google service account key
// // const storage = new Storage({keyFilename: 'key.json'});

// /**
//  * TODO(developer): Uncomment these variables before running the sample.
//  */
// // The ID of your GCS bucket
// const bucketName = 'justforfunmyaan';
// const destFileName = '';
// // const filePath = '';

// async function uploadFile(filePath) {
//     await storage.bucket(bucketName).upload(filePath);
  
//     console.log(`${filePath} uploaded to ${bucketName}`);
//   }
  
//   uploadFile().catch(console.error);


const {format} = require('util');
// const express = require('express');
const Multer = require('multer');

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Storage} = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();

const app = express();
app.set('view engine', 'pug');

// This middleware is available in Express v4.16.0 onwards
app.use(express.json());

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket('testbucket444');

// Display a form for uploading files.
router.get('/', (req, res) => {
  res.render('form.pug');
});

// Process the file upload and upload to Google Cloud Storage.
router.post('/', multer.single('file'), (req, res, next) => {
    console.log(req.files);
    console.log(req.file)
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
    next(err);
  });

  /*blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    // res.status(200).send(file)
    // downloadFile();
    setTimeout(function() {
      
    const file = storage.bucket('testbucket444').file('output.txt');

    file.download(function(err, contents) {
     console.log("file data: "+contents);   
     console.log("file data: "+ typeof(contents));   
     res.status(200).send({'content': contents.toString()});
    }); 
    }, '2000');
    
  });*/

  blobStream.end(req.file.buffer);
});

async function downloadFile() {

}

// async function downloadFile() {
//   const options = {
//     destination: destFileName,
//   };

//   // Downloads the file
//   await storage.bucket(bucketName).file(fileName).download(options);

//   console.log(
//     `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
//   );
// }

// downloadFile().catch(console.error);


 module.exports = router;