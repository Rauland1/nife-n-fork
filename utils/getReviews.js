const ObjectId = require("mongodb").ObjectId;

async function reviewsCount(db, id) {
  return await db.collection("reviews").countDocuments({
    restaurant_id: ObjectId(id),
  });
}

async function restaurantRating(db, id) {
  const rating = await db
    .collection("reviews")
    .aggregate([
      { $match: { restaurant_id: ObjectId(id) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$ratings.overallRating" },
        },
      },
    ])
    .toArray();

  return rating.length ? rating[0].averageRating : null;
}

export default async function getReviewsData(db, id) {
  const count = await reviewsCount(db, id);
  const rating = await restaurantRating(db, id);

  return { count, rating };
}
