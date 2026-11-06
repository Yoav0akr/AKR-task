import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

export default async function handler(req, res) {

    try {

        await client.connect();

        const db = client.db("AKR_task");
        const tareas = db.collection("tareas");

        if (req.method === "GET") {

            const lista = await tareas
                .find({})
                .toArray();

            return res.status(200).json(lista);
        }

        if (req.method === "POST") {

            const nuevaTarea = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                fechaEntrega: req.body.fechaEntrega,
                estado: "pendiente",
                fechaCreacion: new Date()
            };

            const resultado =
                await tareas.insertOne(nuevaTarea);

            return res.status(201).json(resultado);
        }

        return res.status(405).json({
            error: "Método no permitido"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });

    }

}