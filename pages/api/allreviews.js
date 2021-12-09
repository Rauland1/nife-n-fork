const ObjectId = require("mongodb").ObjectId;
import connectToDatabase from "../../utils/mongodb";

export default async function handler(req, res) {
  const restaurant_id = req.query.id;

  try {
    let { db } = await connectToDatabase();

    const reviews = await db
      .collection("reviews")
      .find({ restaurant_id: new ObjectId(restaurant_id) })
      .toArray();

    return res.status(200).json({ reviews, success: true });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
