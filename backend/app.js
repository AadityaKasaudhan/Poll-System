const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const pollRoutes = require('./routes/poll');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', pollRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
