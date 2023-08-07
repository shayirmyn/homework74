import {promises as fs} from "fs";
import {IMessage} from "./types";

const pathName = "./messages";

const fileDb = {
    async getItems () {
        const files = await fs.readdir(pathName);
        return await Promise.all(
            files.map(async file => {
                const messageFile = await fs.readFile(`${pathName}/${file}`);
                return JSON.parse(messageFile.toString());
            })
        );
    },
    async addItem (item: IMessage) {
        const dateTime = new Date().toISOString();
        const message:IMessage = {
            message: item.message,
            datetime: dateTime,
        };
        await fs.writeFile(`${pathName}/${dateTime}.txt`, JSON.stringify(message));
        return message;
    },
};

export default fileDb;