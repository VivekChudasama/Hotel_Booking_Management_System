import app from './routes.js';
import { connectDB } from './util/database.js';

const PORT = process.env.PORT || 3000;
// Connect to 
connectDB().then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to database:', error);
});    