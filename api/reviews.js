// api/reviews.js
export default async function handler(req, res) {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;

  if (!API_KEY || !PLACE_ID) {
    return res.status(500).json({ error: "Missing API credentials" });
  }

  // Fetch the place details and top 5 reviews from Google
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      res.status(200).json(data.result);
    } else {
      res.status(400).json({ error: data.error_message || "Failed to fetch from Google" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error fetching reviews" });
  }
}