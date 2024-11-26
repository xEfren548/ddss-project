import { Request, Response } from "express";
import Stripe from "stripe";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
//Cargar variables de entorno
import dotenv from 'dotenv';
import reservation from "../models/reservation";
dotenv.config();


// Instanciamos Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-11-20.acacia',
});

// Simulamos una reservación estática (sin conexión a MongoDB)
const mockReservation = {
    reservation_num: "RES123456789",
    total: 200, // Total en USD
    room_id: "room1",
    user_id: "user1",
    nNights: 3,
};

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        // Reservación estática
        const reservation = mockReservation;

        // Crear la sesión de pago en Stripe
        const session = await stripe.checkout.sessions.create({
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