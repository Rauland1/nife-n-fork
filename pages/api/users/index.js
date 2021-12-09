import connectToDatabase from "../../../utils/mongodb";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const { username } = req.body;
  const user = session.user;

  let { db } = await connectToDatabase();

  try {
    const {
      value: { user: user_data },
    } = await db.collection("users").findOneAndUpdate(
      { "user.username": username },
      {
        $set: {
          user: {
            user_id: user.sub,
            username: user.nickname,
            picture: user.picture,
            email: user.email,
          },
        },
      },
      {
        upsert: true,
        returnNewDocument: true,
      }
    );

    return res.status(200).json({
      message: "User added to secondary database!",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
});
