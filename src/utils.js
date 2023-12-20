import fs from "fs";

import {fileURLToPath} from "url";
import {dirname} from "path";

export const __filename = fileURLToPath (import.meta.url);
export const __dirname = dirname(__filename);


async function writefile (file, data) {
    try {
        await fs.promises.writeFile(__dirname + "/" + file, JSON.stringify(data));
        return true;
    } catch (error) {console.error("Error al escribir el archivo")}
} 

async function readfile (file) {
    try {
        // let readFileName = __dirname + "/" + file;
        // console.log(readFileName);
        let result  = await fs.promises.readFile(__dirname + "/" + file, "utf-8");
        let data = await JSON.parse(result);
        return data;
    } catch (error) {console.error("Error al leer el archivo")}
} 

async function deletefile (file) {
    try {
        await fs.promises.unlink(__dirname + "/" + file);
        return true;
    } catch (error) {console.error("No se ha podido eliminar el archivo.")}
}

export default {writefile, readfile, deletefile};

