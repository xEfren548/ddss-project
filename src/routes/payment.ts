import { Router } from "express";
//import { createCheckoutSession, paymentCancel, paymentSuccess } from "../controller/payment.controller";
import { createCheckoutSession, renderPaymentSummary } from "../controller/payment.controller";
import { authenticateToken } from '../middlewares/auth';


const router = Router();

//Ruta payment
router.get('/', (req, res) => {
    res.render('payment');
});
router.post("/summary", authenticateToken, renderPaymentSummary);

router.get("/summary", (req, res) => {
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
//router.post("/checkout", createCheckoutSession);

//router.post("/success", paymentSuccess); //si salio exitoso, Debe de rederigir a "reservationConfirmation"

//router.post("/cancel", paymentCancel);  //Si no salio exitoso la compra, debera de arrojar un error.

export default router;