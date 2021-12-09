import connectToDatabase from "../../../utils/mongodb";
import favourite from "../restaurants/favourite";

export default async function handler(req, res) {
  try {
    let { db } = await connectToDatabase();

    const reviews = await db
      .collection("reviews")
      .find({ "user.username": req.query.username })
      .toArray();

    const favourites = await db
      .collection("users")
      .find({ "user.username": req.query.username })
      .toArray();

    return res
      .status(200)
      .json({ reviews, favourites: favourites[0].favourites, success: true });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
