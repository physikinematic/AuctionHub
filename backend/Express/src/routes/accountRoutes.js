const express = require("express");
const accountController = require("../controllers/accountController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/auth/all/:id", authMiddleware, accountController.getAll);
router.post("/auth/signin", accountController.signIn);
router.post("/auth/signup", accountController.signUp);
router.delete("/auth/:id", accountController.deleteOne);

module.exports = router;
