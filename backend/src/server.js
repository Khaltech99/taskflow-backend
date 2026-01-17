import app from "./app.js";
import { connectDb } from "./config/database.js";

const port = process.env.PORT || 7300;

connectDb();

app.listen(port, () => {
  console.log(`Running at port:${port}`);
});
