import { MongoClient, ServerApiVersion } from "mongodb"

export const handler = async (event, context) => {
    const uri = `mongodb+srv://falling10fruit:${process.env.DB_PASSWORD}@wcode-site.lalc61z.mongodb.net/?appName=WCoDE-site`
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(`Connected, looking for user of ${JSON.parse(event.body).id_code}`);

        const user = await client.db('WCoDE').collection('users').find({ id_code: JSON.parse(event.body).id_code }).toArray();

        if (user.length > 0) {
            console.log(user[0])

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Yep that guy exists in our database!",
                }),
            }
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "user not found",
                }),
            }
        }


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

}