const stripe = Stripe('pk_test_51QNG7TA2NCz2jEORg5IJYdSWa4vA0gpd0HH4JonC4W0FsZ8QuTU9eKOs73JZVhEUPOU2p70QAR4QlS6cfsTwiSMC007dm25kF2');

document.getElementById('btn-pagar').addEventListener('click', function () {
    fetch('/payments/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationId: 'reservation-id' }), // El ID de la reservación es ficticio por ahora
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al crear la sesión de pago');
            }
            return response.json();
        })
        .then((data) => {
            return stripe.redirectToCheckout({ sessionId: data.id });
        })
        .then((result) => {
            if (result.error) {
                console.error(result.error.message);
            }
        })
        .catch((error) => {
            console.error('Error al iniciar sesión de pago', error);
        });
});
