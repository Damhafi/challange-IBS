import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger_output.json");

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

// Rota para o Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// PERSONS
app.get("/persons", async (req, res) => {
  const persons = await prisma.person.findMany({
    include: {
      profession: true,
    },
  });

  try {
    res.json({
      success: true,
      payload: {
        status: 200,
        message: "OK",
        result: persons,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      payload: {
        status: 500,
        message: "Internal Server Error",
        details: error,
      },
    });
  }
});

app.get("/persons/:id", async (req, res) => {
  // #swagger.tags = ['persons']
  // #swagger.description = 'Endpoint para obter uma pessoa pelo id.'
  /* #swagger.parameters['id'] = {
      in: 'path',
      description: 'Id da pessoa.',
      required: true,
      type: 'integer'
      } */
  const { id } = req.params;
  const person = await prisma.person.findUnique({
    where: { id: parseInt(id) },
    include: { profession: true },
  });

  if (!person) {
    return res.status(404).json({
      success: false,
      payload: {
        status: 404,
        message: "Not Found",
        details: `Person with ID ${id} not found.`,
      },
    });
  }

  try {
    /* #swagger.responses[200]={ schema: { $ref: "#/definitions/Person", description: 'usuário encontrado' } } */
    res.json({
      success: true,
      payload: {
        status: 200,
        message: "OK",
        result: person,
      },
    });
  } catch (error) {
    /*#swagger.responses[500]*/
    res.json({
      success: false,
      payload: {
        status: 500,
        message: "Internal Server Error",
        details: error,
      },
    });
  }
});

app.post("/persons", async (req, res) => {
  const { name, professionId, phone, email } = req.body;

  if (!name || !professionId) {
    return res.json({
      success: false,
      payload: {
        status: 400,
        message: "Bad Request: missing name or professionId",
      },
    });
  }

  const person = await prisma.person.create({
    data: {
      name,
      profession: {
        connect: { id: professionId },
      },
      phone,
      email,
    },
  });

  try {
    res.json({
      success: true,
      payload: {
        status: 201,
        message: "Created",
        result: person,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      payload: {
        status: 500,
        message: "Internal Server Error",
        details: error,
      },
    });
  }
});

app.put("/persons/:id", async (req, res) => {
  const { id } = req.params;
  const { name, professionId, phone, email } = req.body;
  const person = await prisma.person.update({
    where: { id: parseInt(id) },
    data: {
      name,
      professionId,
      phone,
      email,
    },
  });
  res.json(person);
});

app.delete("/persons/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const personId = parseInt(id);
    if (!personId || isNaN(personId)) {
      throw new Error("Invalid ID");
    }
    await prisma.person.delete({
      where: { id: personId },
    });
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting person: " });
  }
});

// PROFESSIONS
app.get("/professions", async (req, res) => {
  const professions = await prisma.profession.findMany();

  try {
    res.json({
      success: true,
      payload: {
        status: 200,
        message: "OK",
        result: professions,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      payload: {
        status: 500,
        message: "Internal Server Error",
        details: error,
      },
    });
  }
});

app.post("/professions/:id", async (req, res) => {
  const { name } = req.body;
  const profession = await prisma.profession.create({
    data: {
      name,
    },
  });
  res.json(profession);
});

app.put("/professions/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const profession = await prisma.profession.update({
    where: { id: parseInt(id) },
    data: {
      name,
    },
  });
  res.json(profession);
});

app.delete("/professions/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.profession.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: "Profession deleted successfully" });
});

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Todo REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /persons
    GET, PUT, DELETE /persons/:id
    GET, POST /professions
    GET, PUT, DELETE /professions/:id
  </pre>
  `.trim()
  );
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
