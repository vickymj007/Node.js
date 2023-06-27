import { MongoClient} from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

// const connectionString = 'mongodb://127.0.0.1:27017/'
// const connectionString = 'mongodb+srv://vickymj007:Shanks@cluster0.7vhpjei.mongodb.net/?retryWrites=true&w=majority'
const connectionString = process.env.MONGO_URL



export async function dbConnection(){
    const client = new MongoClient(connectionString)
    await client.connect()
    console.log("Mongo DB Connected");
    return client
}



export const client = await dbConnection()
