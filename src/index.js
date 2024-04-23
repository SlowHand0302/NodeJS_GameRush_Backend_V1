require('dotenv').config();
const PORT = process.env.PORT;

const app = require('../src/config/server').init();
const routers = require('./routers');
const db = require('../src/config/database')

db.connect();

app.use('/api', routers);

app.get('/', (req, res) => {
    return res.json('Game Rush API');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
