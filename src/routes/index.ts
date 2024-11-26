import { Router } from "express";
import reservationRoutes from './reservation'
import userRoutes from './user'
import categoryRoutes from './categories';
import roomRoutes from './rooms';
import loginRoutes from './login';
import registerRoutes from './register';
import path from "path";

const router = Router();

//Ruta raiz
router.get('/', (req, res) => {
    res.render('home');
});

/**
 * @swagger
 * /:
 *  get:
 *      tags: [Default]
 *      description: api home endpoint
 *      responses:
 *          200:
 *              description: api success
 */
// /login
router.use('/login', loginRoutes);

// /register
router.use('/register', registerRoutes);

// /users
router.use('/users', userRoutes);

// /reservations
router.use('/reservations', reservationRoutes);

//categories
router.use('/categories', categoryRoutes);

//rooms
router.use('/rooms', roomRoutes);

export default router;