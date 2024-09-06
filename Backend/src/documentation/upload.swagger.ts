/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Uploads an image to AWS S3 in a specific user folder
 *     tags: [File Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to upload the image for
 *               userType:
 *                 type: string
 *                 description: Type of the user (e.g., customer, salon)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to be uploaded
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       400:
 *         description: No file uploaded, missing user ID, or missing user type
 *       500:
 *         description: Error uploading file
 */
