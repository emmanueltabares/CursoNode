const { Router } = require('express');
const { User } = require('../controllers/user');

const router = Router();

router.get('/', User.get)
router.post('/', User.post)
router.put('/:id', User.put)
router.delete('/:id', User.delete)


module.exports = router;