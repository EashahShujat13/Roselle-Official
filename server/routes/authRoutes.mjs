import express from 'express';
import { signUp,
    login,logout,
    getAllUsers,
    forgotPassword,
    resetPassword,
    googleLogin,
    getMyProfile} from '../controllers/authController.mjs';
import verifyToken  from '../middleware/verifyToken.mjs';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout',verifyToken , logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google-login", googleLogin);
router.get("/profile", verifyToken, getMyProfile);
export default router;