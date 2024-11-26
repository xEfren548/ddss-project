import { Router } from "express";
//import { createCheckoutSession, paymentCancel, paymentSuccess } from "../controller/payment.controller";
import { createCheckoutSession, paymentSuccess, renderPaymentSummary } from "../controller/payment.controller";

import { authenticateToken } from '../middlewares/auth';
import { reservationController } from "../controller/reservation.controller";

const router = Router();

//Ruta payment
router.get('/', (req, res) => {
    res.render('payment');
});
router.post("/summary", authenticateToken, renderPaymentSummary);

router.get("/summary",  (req, res) => {
    const { room_id, arrival_date, departure_date, num_of_guests, total } = req.query;
    console.log(room_id)
    res.render("paymentSummary", {
        room_id,
        arrival_date,
        departure_date,
        num_of_guests,
        total,
    });
});

// Ruta para crear session
router.post("/checkout", authenticateToken, createCheckoutSession);

router.post("/success", reservationController.renderReservationConfirmation);

//router.post("/cancel", paymentCancel);  //Si no salio exitoso la compra, debera de arrojar un error.

export default router;