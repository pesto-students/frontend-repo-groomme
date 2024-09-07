/**
 * @swagger
 * /api/user/getUserDetails:
 *   post:
 *     summary: Get user details
 *     description: Retrieves the details of a user specified by user ID in the request body.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: User ID
 *                 name:
 *                   type: string
 *                   description: User name
 *                 email:
 *                   type: string
 *                   description: User email
 *       401:
 *         description: Unauthorized. No token provided or token invalid
 *       403:
 *         description: Forbidden. Token is not valid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
