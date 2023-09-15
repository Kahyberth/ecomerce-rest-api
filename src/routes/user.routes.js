import { Router } from 'express';
import { register } from '../controller/users-controller/register.js';
import { login } from '../auth/login.js';
const router = Router();

router.post('/create-user', register);
router.post('/login', login);
export default router;