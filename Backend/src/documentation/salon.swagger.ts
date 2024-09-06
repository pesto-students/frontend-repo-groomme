/**
 * @swagger
 * components:
 *   schemas:
 *     Coordinates:
 *       type: object
 *       required:
 *         - latitude
 *         - longitude
 *       properties:
 *         latitude:
 *           type: number
 *           format: float
 *           description: The latitude coordinate of the salon
 *         longitude:
 *           type: number
 *           format: float
 *           description: The longitude coordinate of the salon
 *     OpeningClosingHours:
 *       type: object
 *       properties:
 *         opening:
 *           type: number
 *           format: float
 *           description: The opening hour in 24-hour format
 *         closing:
 *           type: number
 *           format: float
 *           description: The closing hour in 24-hour format
 *     SlotGeneration:
 *       type: object
 *       required:
 *         - slotInterval
 *         - openingClosingHours
 *       properties:
 *         slotInterval:
 *           type: number
 *           description: The interval between slots in minutes
 *         openingClosingHours:
 *           type: object
 *           properties:
 *             monday:
 *               $ref: '#/components/schemas/OpeningClosingHours'
 *             tuesday:
 *               $ref: '#/components/schemas/OpeningClosingHours'
 *             wednesday:
 *               $ref: '#/components/schemas/OpeningClosingHours'
 *             thursday:
 *               $ref: '#/components/schemas/OpeningClosingHours'
 *             friday:
 *               $ref: '#/components/schemas/OpeningClosingHours'
 *             saturday:
 *               $ref: '#/components/schemas/OpeningClosingHours'
 *             sunday:
 *               $ref: '#/components/schemas/OpeningClosingHours'
 *     Salon:
 *       type: object
 *       required:
 *         - salonName
 *         - description
 *         - address
 *         - services
 *         - mapLocationLink
 *         - staff
 *         - salonImages
 *         - coordinates
 *         - slotGeneration
 *       properties:
 *         salonName:
 *           type: string
 *           description: The name of the salon
 *         description:
 *           type: string
 *           description: A description of the salon
 *         address:
 *           type: string
 *           description: The address of the salon
 *         services:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the service
 *               description:
 *                 type: string
 *                 description: A description of the service
 *               rate:
 *                 type: number
 *                 description: The rate of the service
 *         mapLocationLink:
 *           type: string
 *           description: A link to the salon's location on the map
 *         staff:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The full name of the staff member
 *               description:
 *                 type: string
 *                 description: A description of the staff member
 *               specialties:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The specialties of the staff member
 *               profilePic:
 *                 type: string
 *                 description: The URL of the staff member's profile picture
 *         salonImages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the salon image
 *         coordinates:
 *           $ref: '#/components/schemas/Coordinates'
 *         slotGeneration:
 *           $ref: '#/components/schemas/SlotGeneration'
 */

/**
 * @swagger
 * /salon/createSalon:
 *   post:
 *     summary: Create a new salon
 *     tags: [Salons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Salon'
 *     responses:
 *       201:
 *         description: The salon was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Salon'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /salon/getSalon:
 *   get:
 *     summary: Get a salon by user ID
 *     tags: [Salons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The salon description by user ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Salon'
 *       404:
 *         description: The salon was not found
 */

/**
 * @swagger
 * /salon/updateSalon:
 *   put:
 *     summary: Update a salon by user ID
 *     tags: [Salons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Salon'
 *     responses:
 *       200:
 *         description: The updated salon description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Salon'
 *       400:
 *         description: Bad request
 *       404:
 *         description: The salon was not found
 */

/**
 * @swagger
 * /salon/deleteSalon:
 *   delete:
 *     summary: Delete a salon by user ID
 *     tags: [Salons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The salon was successfully deleted
 *       404:
 *         description: The salon was not found
 */

/**
 * @swagger
 * /salon/getSalonsList:
 *   get:
 *     summary: Get all salons
 *     tags: [Salons]
 *     responses:
 *       200:
 *         description: List of all salons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Salon'
 *       400:
 *         description: Bad request
 */
