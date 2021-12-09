const ObjectId = require("mongodb").ObjectId;
import getReviewsData from "../../../utils/getReviews";
import connectToDatabase from "../../../utils/mongodb";

export default async function handler(req, res) {
  const id = req.query.id;

  try {
    let { db } = await connectToDatabase();
    const restaurant = await db
      .collection("restaurants")
      .find({ _id: ObjectId(id) })
      .toArray();

    const reviews = await getReviewsData(db, id);

    const result = await Object.assign(restaurant[0], reviews);

    return res.status(200).json({
      message: result,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
