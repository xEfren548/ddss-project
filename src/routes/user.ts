import { Router } from "express"
import usersController from "../controller/users.controller";

//Importacion middlewares
import { authenticateToken } from '../middlewares/auth';
import { authorizaRole } from '../middlewares/permissions';

const router = Router();

//Ruta para Obtener todos los usuarios | Permisos [Admin, Gerente]
router.get('/', authenticateToken, authorizaRole(['Admin', 'Gerente']), usersController.getAllUsers);

//Ruta para Obtener un usuario por el email | Permisos [ everyone ]
router.get('/:id', authenticateToken, usersController.getUserById);


//Ruta para crear un nuevo usuario | Permisos [Todos]
router.post('/', authenticateToken, usersController.createUser);

//Ruta para actualizar info del usuario | Permisos [Admin, Gerente]
router.put('/:id', authenticateToken, authorizaRole(['Admin', 'Gerente']), usersController.updateUser);

//Ruta para eliminar un usuario | Permisos [Admin]
router.delete('/:id', authenticateToken, authorizaRole(['Admin']), usersController.deleteUser);

export default router;