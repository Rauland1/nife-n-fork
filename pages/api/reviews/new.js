const ObjectId = require("mongodb").ObjectId;
import connectToDatabase from "../../../utils/mongodb";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userId = session.user.sub;
  const username = session.user.nickname;

  try {
    let { db } = await connectToDatabase();

    const {
      restaurant,
      reviewBody,
      price,
      value,
      atmosphere,
      foodQuality,
      serviceQuality,
    } = req.body;

    const restaurant_id = restaurant._id;
    const overallRating =
      (price + value + atmosphere + foodQuality + serviceQuality) / 5;
    const ratings = {
      price,
      value,
      atmosphere,
      foodQuality,
      serviceQuality,
      overallRating,
    };
    const timestamp = new Date().toISOString();

    const review = await db.collection("reviews").insertOne({
      user: {
        user_id: userId,
        username,
      },
      restaurant_id: new ObjectId(restaurant_id),
      reviewBody,
      ratings,
      added: timestamp,
    });

    return res.status(200).json({ message: review, success: true });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
});
