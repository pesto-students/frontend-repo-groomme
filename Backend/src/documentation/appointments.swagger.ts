/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Endpoints for managing appointments.
 */

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Book an appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - salonId
 *               - serviceRequestedId
 *               - staffId
 *               - date
 *               - time

 *             properties:
 *               salonId:
 *                 type: string
 *                 description: The ID of the salon where the appointment is booked.
 *               serviceRequestedId:
 *                 type: string
 *                 description: The ID of the requested service.
 *               staffId:
 *                 type: string
 *                 description: The ID of the staff handling the appointment.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the appointment in YYYY-MM-DD format.
 *               time:
 *                 type: string
 *                 description: The time of the appointment.
 *               notes:
 *                 type: string
 *                 description: Optional notes for the appointment.
 *     responses:
 *       201:
 *         description: Appointment booked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment booked successfully
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Validation failed.
 *       404:
 *         description: User or salon not found.
 *       500:
 *         description: Failed to book appointment.
 */

/**
 * @swagger
 * /{id}/approve:
 *   patch:
 *     summary: Approve an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment to approve.
 *     responses:
 *       200:
 *         description: Appointment approved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment approved
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found.
 *       500:
 *         description: Failed to approve appointment.
 */

/**
 * @swagger
 * /{id}/cancel:
 *   patch:
 *     summary: Cancel an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment to cancel.
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment cancelled
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found.
 *       500:
 *         description: Failed to cancel appointment.
 */

/**
 * @swagger
 * /appointmentsList:
 *   get:
 *     summary: Get a list of appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 appointments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Failed to get appointments.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user booking the appointment.
 *         salonId:
 *           type: string
 *           description: The ID of the salon where the appointment is booked.
 *         serviceRequestedId:
 *           type: string
 *           description: The ID of the requested service.
 *         staffId:
 *           type: string
 *           description: The ID of the staff handling the appointment.
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the appointment in YYYY-MM-DD format.
 *         time:
 *           type: string
 *           description: The time of the appointment.
 *         notes:
 *           type: string
 *           description: Optional notes for the appointment.
 *         status:
 *           type: string
 *           description: The status of the appointment (e.g., approved, cancelled).
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the appointment was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the appointment was last updated.
 */
