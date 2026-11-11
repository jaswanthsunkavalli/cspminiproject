import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as authController from '../controllers/authController.js';
import * as complaintController from '../controllers/complaintController.js';
import * as surveyController from '../controllers/surveyController.js';
import * as awarenessController from '../controllers/awarenessController.js';
import * as adminController from '../controllers/adminController.js';
import * as userController from '../controllers/userController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

// Configure Multer storage
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'complaint-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP) are allowed!') as any, false);
    }
  },
});

// Image Upload Endpoint
router.post('/upload', authenticateToken, upload.single('image'), (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authenticateToken, authController.getMe);

// Complaints Routes
router.post('/complaints', authenticateToken, complaintController.createComplaint);
router.get('/complaints', complaintController.getAllComplaints);
router.get('/complaints/my', authenticateToken, complaintController.getMyComplaints);
router.get('/complaints/:id', complaintController.getComplaintById);
router.patch(
  '/complaints/:id/status',
  authenticateToken,
  requireRole(['volunteer', 'admin']),
  complaintController.updateStatus
);
router.patch(
  '/complaints/:id/priority',
  authenticateToken,
  requireRole(['admin']),
  complaintController.updatePriority
);
router.patch(
  '/complaints/:id/assign',
  authenticateToken,
  requireRole(['admin']),
  complaintController.assignComplaint
);

// Survey Routes
router.get('/surveys/questions', surveyController.getQuestions);
router.post('/surveys/responses', surveyController.submitSurvey);
router.get(
  '/surveys/analytics',
  authenticateToken,
  requireRole(['volunteer', 'admin']),
  surveyController.getSurveyAnalytics
);

// Awareness Routes
router.get('/awareness', awarenessController.getAwarenessPosts);
router.post(
  '/awareness',
  authenticateToken,
  requireRole(['admin']),
  awarenessController.createAwarenessPost
);
router.patch(
  '/awareness/:id',
  authenticateToken,
  requireRole(['admin']),
  awarenessController.updateAwarenessPost
);
router.delete(
  '/awareness/:id',
  authenticateToken,
  requireRole(['admin']),
  awarenessController.deleteAwarenessPost
);

// Admin Routes
router.get(
  '/admin/dashboard',
  authenticateToken,
  requireRole(['admin', 'volunteer']),
  adminController.getDashboardStats
);
router.get(
  '/admin/users',
  authenticateToken,
  requireRole(['admin']),
  adminController.getUsers
);
router.patch(
  '/admin/users/:id/role',
  authenticateToken,
  requireRole(['admin']),
  adminController.updateUserRole
);
router.get(
  '/admin/reports',
  authenticateToken,
  requireRole(['admin', 'volunteer']),
  adminController.getReports
);

// User Profile Routes
router.patch('/users/profile', authenticateToken, userController.updateProfile);
router.patch('/users/change-password', authenticateToken, userController.changePassword);
router.get('/users/notifications', authenticateToken, userController.getNotifications);

export default router;
