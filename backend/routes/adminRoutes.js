import express from 'express';
import { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', requireAdmin, (req, res) => {
    res.json({ message: 'Bienvenido al panel de administración' });
});

export default router;