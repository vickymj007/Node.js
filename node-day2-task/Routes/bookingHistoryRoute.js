import express from 'express'
import { getBookingHistory } from '../Controllers/bookingHistoryController';

const router = express.Router()


router.get('/', getBookingHistory)


export default router;
