const express = require('express');
const app = express();
// const bodyParser = require('body-parser');

app.set('secret', 'rookie_he');
require('express-async-errors');

app.use(require('cors')());
app.use(express.json())

// router.use(bodyParser());
app.use('/', express.static(__dirname + './web'));
app.use('/admin', express.static(__dirname + './admin'));
app.use('/uploads', express.static(__dirname + './uploads'));

require('./plugins/db.js')(app);
require('./routes/admin/index.js')(app);
require('./routes/web/index.js')(app);

app.listen(3000, () => {
    console.log("http://localhost:3000");
})
