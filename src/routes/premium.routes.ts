import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/plan', authenticate, (_req: AuthRequest, res: Response) => {
  res.json({ plans: [{ id: 'monthly', name: 'Monthly', price: 9.99, currency: 'USD' }, { id: 'yearly', name: 'Yearly', price: 49.99, currency: 'USD', savings: '58%' }] });
});

router.post('/create-checkout', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ url: 'https://checkout.stripe.com/pay/session_placeholder', sessionId: 'cs_test_placeholder' });
});

router.post('/webhook', (req, res) => res.json({ received: true }));

router.post('/cancel', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ message: 'Subscription cancelled. You will retain access until the end of the billing period.' });
});

export default router;
