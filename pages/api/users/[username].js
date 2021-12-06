import connectToDatabase from "../../../utils/mongodb";

export default async function handler(req, res) {
  try {
    let { db } = await connectToDatabase();

    const reviews = await db
      .collection("reviews")
      .find({ "user.username": req.query.username })
      .toArray();

    return res.status(200).json({ message: reviews, success: true });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
