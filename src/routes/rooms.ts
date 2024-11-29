import { Router } from 'express';
import roomsController from '../controller/rooms.controller';

//Importacion middlewares
import { authenticateToken } from '../middlewares/auth';
import { authorizaRole } from '../middlewares/permissions';

const router = Router();

//Obtener todas las habitaciones | Permisos [Todos]
router.get('', roomsController.getAll);

/**
 * @swagger
 * /rooms{room_id}:
 *  get:
 *      tags: [Rooms]
 *      description: get one room by id
 *      responses:
 *          200:
 *              description: room
 *          404:
 *              description: room not found
 *          500: 
 *              description: server error
 */

//Obtener la habitacion por el ID | Permisos [Todos]
router.get('/:room_id', roomsController.getRoomByID);

/**
 * @swagger
 * /rooms:
 *  post:
 *      tags: [Rooms]
 *      description: create new room
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Room'
 *      responses: 
 *          400:
 *              description: bad request
 *          201:
 *              description: room created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Room'
 *          500: 
 *              description: server error
 */

//Crear una habitacion | Permisos [Gerente]
router.post('', authenticateToken, authorizaRole(['Gerente']), roomsController.createRoom);

//Actualizar una habitacion | Permisos [Gerente]
router.put('/:room_id', authenticateToken, authorizaRole(['Gerente']), roomsController.updateRoom);

//Eliminar una habitacion | Permisos [Gerente]
router.delete('/:room_id', authenticateToken, authorizaRole(['Gerente']), roomsController.deteleRoom);

export default router;