import { Router } from "express";
import path from "path";
import UserController from "../controller/users.controller";

const router = Router();

//Ruta raiz
router.get('/', (req, res) => {
    res.render('login');
});

//Ruta Login POST
router.post('/', UserController.login);

export default router;