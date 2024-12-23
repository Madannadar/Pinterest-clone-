import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUrl = (file) => {
    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file object passed to getDataUrl");
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();

    return parser.format(extName, file.buffer);
};

export default getDataUrl;
