const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const mainRouter = require('./routes/mainRouter');
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');


const app = express();


// Подключаем mongoose.
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pavel:134qerADF@cluster0.bnkdi.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    store: new FileStore(),
    key: "user_sid",
    secret: "anything here",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use((req, res, next) => {
  res.locals.isAuth = !!req.session.user;
  if (req.session.user) {
    res.locals.user = req.session.user;
    res.locals.userName = req.session.user.name;
  };
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  };
  next();
});


// Allows you to use PUT, DELETE with forms.
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// ----------------------------------------------------------------------ROUTES
app.use((req, res, next) => {
  //неправильный пароль
  if (req.session.invalidpass) {
    res.locals.invalidpass = true;
  } else {
    res.locals.invalidpass = false;
  }
  next()
})
app.use('/', mainRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

// ----------------------------------------------------------------------ROUTES

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.listen(process.env.PORT ?? 3000, () => { console.log('CONNECTED------------------------------------------------>'); });
module.exports = app;
