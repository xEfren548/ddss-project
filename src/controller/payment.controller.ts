import { Request, Response } from "express";
import Stripe from "stripe";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
//Cargar variables de entorno
import dotenv from 'dotenv';
import reservation from "../models/reservation";
import Room from '../models/room';
dotenv.config();

// Instanciamos Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-11-20.acacia',
});

export const renderPaymentSummary = async (req: Request, res: Response) => {
    try {
        //Leer datos desde Req.body
        const { room_id, arrival_date, departure_date, num_of_guests, total } = req.body;

        //validar datos
        if (!room_id || !arrival_date || !departure_date || !num_of_guests || !total) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Faltan datos obligatorios para la reservación." });
        }

        //Buscar habitacion en la bDD
        const room = await Room.findOne({ room_id }).lean();
        if (!room) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).send("Habitación no encontrada");
        }

        // Redirigir al resumen del pago con los datos necesarios
        res.json({
            redirectUrl: `/payments/summary?room_id=${room_id}&arrival_date=${arrival_date}&departure_date=${departure_date}&num_of_guests=${num_of_guests}&total=${total}`,
        });
    } catch (error) {
        console.error("Error rendering payment summary", error);
        res.status(HTTP_STATUS_CODES.SERVER_ERROR).send("Error interno del servidor");
    }
};

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const { total, room_id } = req.body;

        //Verificar la habitacion si existe
        const room = await Room.findOne({ room_id }).lean();
        if (!room) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).send("Habitación no encontrada");
        }

        //Conexion con stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "mxn",
                        product_data: { name: `Reservación: ${room.name}` },
                        unit_amount: total * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:3000/payments/success`,
            cancel_url: `http://localhost:3000/reservations/confirmation/cancel`,
        });

        res.json({ id: session.id });
    } catch (err) {
        console.error("Error creando sesión de pago", err);
        res.status(HTTP_STATUS_CODES.SERVER_ERROR).send("Error interno del servidor");
    }
};

export const paymentSuccess = async (req: Request, res: Response) => {

    try {
        const { room_id } = req.body;

        if(!room_id) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Falta el ID de la habitacion")
        }
        //rederigir a la vista de confirmacion
        res.redirect(`/reservations/confirmation/${room_id}`);
    } catch (error){
        console.error('Error al procesar el exito del pago', error);
        res.status(HTTP_STATUS_CODES.SERVER_ERROR).send('Error interno del servidor')
    }

    const reservationId = req.body.reservation_id;
    res.redirect(`/reservations/confirmation/${reservationId}`);
};



/*
export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        // Reservación estática (prueba)
        const reservation = mockReservation;

        // Crear la sesión de pago en Stripe
        const session = await stripe.checkout.sessions.create({
            //Aca necesito Importar los datos extraidos de la otra pagina
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Hotel Reservation - ${reservation.reservation_num}`,
                        },
                        unit_amount: reservation.total * 100, // Stripe usa centavos
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:3000/payments/success`,
            cancel_url: `http://localhost:3000/payments/cancel`,
        });

        // Devolver el ID de la sesión de Stripe
        res.json({ id: session.id });
    } catch (err) {
        console.error("Error creating checkout session", err);
        res.status(HTTP_STATUS_CODES.SERVER_ERROR).send("Internal server error"); // Aseguramos que es un mensaje de error simple
    }
};

export const paymentSuccess = (req: Request, res: Response) => {
    res.render("paymentSuccess");
};

export const paymentCancel = (req: Request, res: Response) => {
    res.render("paymentCancel");
};
*/