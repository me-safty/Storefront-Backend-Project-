import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import config from "./config";
import routes from "./routes/index";
import morgan from "morgan";

const app: express.Application = express();

const port = config.PORT || 3000;

app.use(bodyParser.json());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`server starts at: http://localhost:${port}/`);
});

export default app;
