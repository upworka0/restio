import app from "./app";
import config from "./config";

const port = config.get('port');

app.listen(port, (err) => {

    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);

});