import connectToDatabase from "../../utils/mongodb";
import getReviewsData from "../../utils/getReviews";

export default async function handler(req, res) {
  const input = req.query.q;

  try {
    let { db } = await connectToDatabase();

    const restaurants = await db
      .collection("restaurants")
      .find({ name: { $regex: input, $options: "i" } })
      .toArray();

    for (let rest of restaurants) {
      const reviewData = await getReviewsData(db, rest._id);
      rest.count = reviewData.count;
      rest.rating = reviewData.rating;
    }

    return res.status(200).json({
      message: restaurants,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
