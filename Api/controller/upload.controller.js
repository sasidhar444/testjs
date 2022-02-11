const { Storage } = require('@google-cloud/storage');
const fs = require('fs-extra')

class UploadController {
	register(app) {
		app.route('/upload')
			.post(async (request, response, next) => {
				try {
					const filBuffer = request.files.file.data;
					var filePath = `public/${request.files.file.name}`;

					fs.createWriteStream(filePath).write(filBuffer);
	
					const bucketName = 'testbucket555';

					// The new ID for your GCS file
					const destFileName = request.files.file.name;

					// Creates a client
					const storage = new Storage();

					const x = await storage.bucket(bucketName).upload(filePath, {
						destination: destFileName,
					});

					response.json({
						"success": true,
						"event": "UPLOAD_FILE",
						"message": "file uploaded successfully",
						"data": x
					});
				} catch (error) {
					console.log(error);
					response.status(500).send({error: error.message})
				} finally {
					
					if (fs.existsSync(filePath)) {
						fs.unlink(filePath, (err) => {
							if (err) {
							  console.error(err)
							  return
							}
						  
							//file removed
						  })
					}

				}
			});
	}
}

module.exports = UploadController;
