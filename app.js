require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const port = 4000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static('public'));

// session settings
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    }
  })
);

app.use(flash({ sessionKeyName: 'flashMessage' }));


// set layout and view engine before using expressLayouts
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use(expressLayouts);

// use flash() as a middleware function


app.use('/', require('./server/routes/customers'));

// ERROR 404 PAGE NOT FOUND
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});