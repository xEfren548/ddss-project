import { Router } from "express";
import path from "path";

const router = Router();

//Ruta raiz
router.get('/',(req, res) => {
    res.render('home');
});

export default router;