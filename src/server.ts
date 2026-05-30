import app from "./app";
import { config } from "./config";

const main = async () => {
  return app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main();
