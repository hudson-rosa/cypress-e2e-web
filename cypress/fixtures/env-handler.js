let os = require("os");

const dotEnvConf = envFilePath => require("dotenv").config({ path: envFilePath });
const logging = varToShow => console.log(`\nEnvironment: ${varToShow}\n`);

module.exports = {
  selectEnv: function() {
    let env = String(process.env.TEST_ENV).toLowerCase();
    
    switch (env) {
      case "dev":
        dotEnvConf("./.env.dev");
        logging(env);
        break;

      case "prod":
      case "live":
        dotEnvConf("./.env.prod");
        logging(env);
        break;

      case "staging":
      default:
        dotEnvConf("./.env.staging");
        process.env.TEST_ENV = "staging";
        logging("staging");
    }
  }
};
