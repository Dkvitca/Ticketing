import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middelware/current-user';
import { requireAuth } from '../middelware/require-auth';
const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null })
});

export {router as currentUserRouter}