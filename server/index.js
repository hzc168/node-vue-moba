const express = require('express');
const app = express();
// const bodyParser = require('body-parser');

app.set('secret', 'rookie_he');
require('express-async-errors');

// router.use(bodyParser());
app.use('/uploads', express.static('./uploads'));

app.use(require('cors')());
app.use(express.json())

require('./plugins/db.js')(app);
require('./routes/admin/index.js')(app);

app.listen(3000, () => {
    console.log("http://localhost:3000");
})
