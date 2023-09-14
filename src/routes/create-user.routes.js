import { Router } from 'express';
import { register } from '../controller/users-controller/register.js';
const router = Router();

router.post('/create-user', register);

export default router;