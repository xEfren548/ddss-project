import { Router } from 'express';
import { reservationController } from '../controller/reservation.controller'

//Importacion middlewares
import { authenticateToken } from '../middlewares/auth';
import { authorizaRole } from '../middlewares/permissions';

const router = Router();

//Obtener todas las reservaciones | Permisos [Recepcionista]
router.get('/', authenticateToken, authorizaRole(['Recepcionista', 'Gerente']), reservationController.getAllReservations);


//Obtener la reservacion por ID | Permisos [Cliente, Recepcionista]
router.get('/:id', authorizaRole(['Cliente', 'Recepcionista']), reservationController.getReservationById);

/**
 * @swagger
 * /reservations:
 *  post:
 *      tags: [Reservations]
 *      description: create new reservation
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Reservation'
 *      responses: 
 *          400:
 *              description: bad request
 *          201:
 *              description: reservation created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reservation'
 *          500: 
 *              description: server error
 */

//Crear una reservacion | Permisos [Cliente]
router.post('/',  authenticateToken, authorizaRole(['Cliente', 'Recepcionista']), reservationController.createReservation);


//Actualizar una reservacion | Permisos [Recepcionista]
router.put('/:id', authenticateToken, authorizaRole(['Cliente', 'Recepcionista']), reservationController.updateReservation);

//Eliminar una reservacion | Permisos [Recepcionista]
router.delete('/:id',  authenticateToken, authorizaRole(['Cliente','Recepcionista']), reservationController.deleteReservation);

router.get('/room/:id', authenticateToken, reservationController.getReservationsByRoomId)

router.get('/confirmation/:id', reservationController.renderReservationConfirmation)

router.get('/user/:id', authenticateToken, reservationController.getReservationsByUserId)

export default router;
