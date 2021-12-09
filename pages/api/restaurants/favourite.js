import connectToDatabase from "../../../utils/mongodb";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userId = session.user.sub;
  const username = session.user.nickname;
  const restaurantId = req.body.restaurantId;
  const restaurantName = req.body.restaurantName;

  let { db } = await connectToDatabase();
  let favourites = [];

  try {
    const foundUser = await db
      .collection("users")
      .find({ "user.username": username })
      .toArray();

    if (foundUser.favourites) favourites = foundUser[0]?.favourites;

    if (favourites.some((e) => e.restaurant_id === restaurantId)) {
      return res.status(200).json({
        message: "Restaurant is already a favourite. ",
        success: true,
      });
    } else {
      favourites = [
        ...favourites,
        { restaurant_id: restaurantId, name: restaurantName },
      ];
    }

    const { acknowledged } = await db.collection("users").updateOne(
      { "user.username": username },
      {
        $set: {
          favourites,
        },
      },
      {
        upsert: true,
      }
    );

    if (acknowledged) {
      return res.status(200).json({
        message: "Restaurant added successfully!",
        success: true,
      });
    } else {
      return res.status(500).json({
        message: "Error adding restaurant!",
        success: false,
      });
    }
  } catch (error) {
    return res.status(403).json({
      message: new Error(error).message,
      success: false,
    });
  }
});

// const data = await getAccessToken();

// if (data?.access_token) {
//   url = `${process.env.MGMT_API_URL}/api/v2/users/${userId}`;

//   const config = {
//     headers: {
//       "content-type": "application/json",
//       authorization: `Bearer ${data.access_token}`,
//     },
//   };

//   // Get user metadata
//   const {
//     data: {
//       user_metadata: { favourite_restaurants: favourites },
//     },
//   } = await axios.get(url, config);

//   if (favourites.includes(restaurantId)) {
//     return res.status(200).json({
//       message: "Restaurant is already a favourite.",
//       success: true,
//     });
//   }
// }
