const { register, login, avatar, contacts } = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id", avatar);
router.get("/contacts/:id", contacts);

module.exports = router;
