import express from "express";

const router = express.Router();

/*  #swagger.tags = ['Users']
    #swagger.summary = 'Get all users'
*/
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: ["User1", "User2"],
  });
});

export default router;
