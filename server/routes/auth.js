const { register, login, avatar } = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id", avatar);

module.exports = router;
