import * as express from 'express';
import FormRouter from './form.js';
import ResponseRouter from './response.js';

const router = express.Router();

router.use('/forms', FormRouter);
router.use('/responses', ResponseRouter);

router.get('/', (req, res) => {
  res.send('Google Forms API is working fine.');
});

export default router;
