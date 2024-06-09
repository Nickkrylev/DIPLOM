import dotenv from 'dotenv';
import app from './app.js'; // Note the .js extension
import User from './models/User';
import SinglePlayerGame from './models/singleGame';
import DuelGame from './models/doubleGame';

dotenv.config();

(async () => {
    try {
        await SinglePlayerGame.sync();
        await DuelGame.sync();
        await User.sync();
        console.log('Database and tables have been created!');
    } catch (error) {
        console.error('Error creating the database and tables:', error);
    }
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
