const express = require('express');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session)  // this will not store session in ram but will store in db

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users')
const app = express();


require('./config/passport')(passport);

mongoose.connect('mongodb://localhost:27017/shopping', {
  useNewUrlParser: true
});

require('./seed/product-seeder')

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'})); // this will search for layouts.hbs file, file extension by default is .handlebars.
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'gfhswvg3ruyg3764t4v4764f476',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection}),  // make sure no new connection is open
  cookie: {maxAge: 180 * 60 * 1000} // milliseconds : this is 3 hours, session will expire after 3 hours
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
  res.locals.login = req.isAuthenticated(); // will be available in all views
  res.locals.session = req.session
  next();
})

app.use('/', indexRouter);
app.use('/user', userRouter)

const PORT = process.env.PORT || 8765;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})