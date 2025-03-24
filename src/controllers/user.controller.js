const User = require("../models/User.model.js");

const createUser = async (req, res) => {
  const { email, username } = req.body;
  const auth0Id = req.auth?.sub;

  if (!auth0Id || !email || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let user = await User.findOne({ auth0Id });

    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    user = new User({ auth0Id, email, username });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// const getUserData = async (req, res) => {
//   const { auth0Id } = req.params;

//   if (!auth0Id) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const user = await User.findOne({ auth0Id });

//     if (!user) {
//       return res.status(404).json({ error: "User does not exist" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

const getUserData = async (req, res) => {
  try {
    // Extract auth0Id from the JWT token (set by checkJwt middleware)
    const auth0Id = req.auth?.sub;

    if (!auth0Id) {
      return res.status(401).json({ error: "Unauthorized: Missing Auth0 ID" });
    }

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const protectedRoute = (req, res) => {
  res.json({ message: "Ovo je zaštićena ruta" });
};

module.exports = { createUser, protectedRoute, getUserData };
