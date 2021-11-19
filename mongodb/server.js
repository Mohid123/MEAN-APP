//bring in all dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const crypto = require("crypto");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//import the database configuration file and connect the server to the db using mongoose
const config = require("./config/db");

mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// let conn = mongoose.connection;

//initialize app

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);
app.use(cookieParser());

//init gfs

// let gfs;

//GRidFS with mongoose

// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: 'mongodb://localhost:27017/animetography',
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({ storage });

//static files access
//app.use(express.static(path.join(__dirname, '/public')));
app.use(
    express.static(
        path.join(process.cwd() + "../../Animetography/dist/Animetography/")
    )
);

app.use("/public", express.static(path.join("public")));

//initialize bodyparser, passport and exress-session middleware
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

app.use(
    session({
        secret: "keyboard cat",
        resave: true,
        saveUninitialized: true,
        //cookie: { secure: true }
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//routes

app.get("/", (req, res) => {
    res.sendFile(path.resolve("../Animetography/dist/Animetography/index.html"));
});

app.use("/api/users", require("./routes/users")); //main route users which will lead to register and login etc.
app.use("/api/blogs", require("./routes/users"));
app.use("/api/gallery", require("./routes/users"));

//port number we use
const port = 3000;

//start server
app.listen(
    port,
    console.log(
        `Server Running in ${process.env.NODE_ENV} mode on port ${port} and database on ${config.database}`
    )
);