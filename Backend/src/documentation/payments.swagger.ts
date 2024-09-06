/**
 * @swagger
 * /payment/create-payment-intent:
 *   post:
 *     summary: Create a payment intent
 *     description: Create a payment intent with Stripe to initiate the payment process.
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 description: The amount to be charged in the smallest currency unit (e.g., cents).
 *                 example: 5000
 *               currency:
 *                 type: string
 *                 description: The currency for the payment (e.g., "usd").
 *                 example: "usd"
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *                   description: The client secret of the payment intent used for confirming the payment on the client side.
 *                   example: "pi_1HhGJHJ2hfjG9v7jKL43YRG_secret_kjJH234JkH324"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal Server Error"
 */
