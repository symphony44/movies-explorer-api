const router = require('express').Router();

const { validateUpdateUserInfo } = require('../middlewares/validator');
const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUserInfo, updateUserInfo);

module.exports = router;
