// Modern Deno.serve syntax - No imports needed!

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  // 1. Handle CORS Preflight (The Browser Knock)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    // Check if Key exists
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      throw new Error("Server configuration error: Missing Email Key");
    }

    const { type, booking, message } = await req.json();

    let subject = "";
    let htmlContent = "";

    // --- TEMPLATE 1: CONFIRMATION ---
    if (type === "confirmation") {
      subject = "Booking Confirmed! ✅ - Bamboo Woods";
      htmlContent = `
        <h1>Booking Confirmed!</h1>
        <p>Dear ${booking.name},</p>
        <p>We are delighted to confirm your reservation for <strong>${booking.guests} people</strong> on <strong>${new Date(booking.date).toLocaleDateString()}</strong>.</p>
        <p>Location: Nakuru-Marigat Road</p>
      `;
    } 
    // --- TEMPLATE 2: REJECTION ---
    else if (type === "rejection") {
      subject = "Update regarding your reservation";
      htmlContent = `
        <h2>Reservation Update</h2>
        <p>Dear ${booking.name},</p>
        <p>${message}</p>
      `;
    }

    // --- SEND EMAIL via RESEND ---
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bamboo Woods <onboarding@resend.dev>",
        to: [booking.email], 
        subject: subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Resend API Error:", data);
        throw new Error(JSON.stringify(data));
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Function Error:", error);
    // CRITICAL: Return the error WITH cors headers so the browser sees it
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400, // or 500
    });
  }
});