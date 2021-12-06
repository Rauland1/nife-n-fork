const ObjectId = require("mongodb").ObjectId;
import connectToDatabase from "../../../utils/mongodb";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      getReviewById(res, id);
      break;
    case "PUT":
      updateReview(req, res, id);
      break;
    case "DELETE":
      deleteReview(res, id);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getReviewById(res, id) {
  let { db } = await connectToDatabase();

  try {
    const review = await db
      .collection("reviews")
      .find({ _id: new ObjectId(id) })
      .toArray();

    return res.status(200).json({
      message: review[0],
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function updateReview(req, res, id) {
  let { db } = await connectToDatabase();

  const { reviewBody, price, value, atmosphere, foodQuality, serviceQuality } =
    req.body;

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

  try {
    const review = await db.collection("reviews").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ratings: ratings,
          reviewBody: reviewBody,
        },
      }
    );

    return res.status(200).json({
      message: review,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function deleteReview(res, id) {
  let { db } = await connectToDatabase();

  try {
    const review = await db
      .collection("reviews")
      .deleteOne({ _id: new ObjectId(id) });

    return res.status(200).json({
      message: review,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
