const express = require("express");
const app = express();

const PORT = 5000;
const database = require("./database");


const user = require("./routes/user_routes");
const task = require("./routes/task_routes");
const subtask = require("./routes/subtask_routes");

app.use((req, res, next) => {
    console.log("hello from logger");
    next();
})

app.use(express.json());
app.use("/user", user);
app.use("/task", task);
app.use("/subtask", subtask)



if (database.sync()) {
    console.log("tables made");
    app.listen(PORT, () => {
        console.log(`app started on http://localhost:${PORT}`);
    })
}
