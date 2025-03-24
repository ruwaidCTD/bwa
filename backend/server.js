import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import contactRoutes from './routes/contact.js'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/contact', contactRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
