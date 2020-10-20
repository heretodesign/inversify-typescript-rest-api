import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import {
  interfaces,
  InversifyExpressServer,
  TYPE,
} from "inversify-express-utils";

import "./server/controllers/Usercontroller";
import { userContainer } from "./server/inversify.config";

//Start the server
let server = new InversifyExpressServer(userContainer);

server.setConfig((app) => {
  let logger = morgan("combined");
  app.use(logger);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(4000);
console.log("server started on port 4000");
