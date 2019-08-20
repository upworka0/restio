import nconf from "nconf";


nconf
    .argv()
    .env()
    .file({ file: `src/config/prod.json` });

export default nconf;
