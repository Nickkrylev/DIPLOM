import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import router from './routers/index'; // Adjust the path as necessary
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(bodyParser.json());
app.use(logger(formatsLogger));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
    cors({
        origin: '*',
    })
);

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, '../../client', 'build')));

app.use('/api', router);

app.get('/*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '../../client', 'build', 'index.html')
    );
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

export default app;
