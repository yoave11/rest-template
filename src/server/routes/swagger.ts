import {AsyncRouter} from 'express-async-router';

const swaggerSpec = require('../swagger.json');

const router = AsyncRouter();

router.get('/v1/swagger.json', () => swaggerSpec);

export default router;
