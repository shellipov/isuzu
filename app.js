const express = require('express');
const useMiddleware = require('./middleware');
const useErrorHandlers = require("./middleware/error-handlers");
const dotenv = require("dotenv");
dotenv.config();

// ________routes
const adminRouter = require("./routes/admin");
const anothercarRouter = require("./routes/anothercar");
const configuratorRouter = require("./routes/configurator");
const indexRouter = require("./routes/index");
const optionsRouter = require("./routes/options");
const comparisonRouter = require("./routes/comparison")
const configurationRouter = require("./routes/configuration")
///////////////////////////////////
const app = express();
useMiddleware(app);

////////////////////////////
app.use("/admin", adminRouter);
app.use("/anothercar", anothercarRouter);
app.use("/configurator", configuratorRouter);
app.use("/", indexRouter);
app.use("/options", optionsRouter);
app.use("/comparison", comparisonRouter)
app.use("/configuration", configurationRouter)
////////////////////////////////////
useErrorHandlers(app);

app.listen(process.env.PORT, console.log('!!!!!!!!!!!!!!!!!!!!!!!!!'));
module.exports = app;



