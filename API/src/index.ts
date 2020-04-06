import express from 'express';
import { json } from 'body-parser';
const cors =  require('cors');
import router from './routes/index';
import { port } from './settings';

const app = express();
//  middlewares
app.use(cors());
app.use(json());

app.use("/", router);

app.listen(port, () => console.log(`Tic tac toe app listening on port ${port}!`));
