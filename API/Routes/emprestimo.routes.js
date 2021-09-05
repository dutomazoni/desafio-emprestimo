import {emprestimo_routes} from '../Controllers';
import { Router } from 'express';

let router = Router();

router.get(
    '/',
    emprestimo_routes.get_standard_message
);

router.post(
    '/emprestimo',
    emprestimo_routes.post_emprestimo
);
router.post(
    '/finalizar',
    emprestimo_routes.post_resultado
);


export default router;
