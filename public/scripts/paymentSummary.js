const btnPagar = document.getElementById("btn-proceder-pago");
btnPagar.addEventListener("click", async function () {
    try {
        const response = await fetch('/payments/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ total: '{{total}}', room_id: '{{room.room_id}}' })
        });

        if (!response.ok) throw new Error('Error al crear sesión de pago');

        const data = await response.json();
        const stripe = Stripe('pk_test_51QNG7TA2NCz2jEORg5IJYdSWa4vA0gpd0HH4JonC4W0FsZ8QuTU9eKOs73JZVhEUPOU2p70QAR4QlS6cfsTwiSMC007dm25kF2');
        stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
        console.error("Error al iniciar el pago", error);
    }
});