import emprestimo_routes from './emprestimo.routes';
import { Router } from 'express';

var router = Router();

router.use(emprestimo_routes);

export default router;
