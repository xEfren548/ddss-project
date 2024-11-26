import { Router } from "express";
import { createCheckoutSession, paymentCancel, paymentSuccess } from "../controller/payment.controller";

import { authenticateToken } from '../middlewares/auth';


const router = Router();

//Ruta payment
router.get('/', (req, res) => {
    res.render('payment');
});

// Ruta para crear session
router.post("/checkout", createCheckoutSession);

router.post("/success", paymentSuccess);

router.post("/cancel", paymentCancel);

export default router;