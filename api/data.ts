import { eventHandler, getRequestURL } from "vinxi/http";
import { readBody } from "vinxi/http";

import { MongoClient } from "mongodb";
import { recipe } from "../metadata/recipes";

// Replace the placeholder connection string below with your
// Atlas cluster specifics. Be sure it includes
// a valid username and password! Note that in a production environment,
// you do not want to store your password in plain-text here.
import userData from "../../cred/mongodb0.mjs"; //this hides credentials, change to set yours
// const userData = ["userName","password", "cluster0.something"]
// export default userData;
const [user, password, cluster] = userData;
const uri = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;

const recipeArray: recipe[] = [];

async function run() {
  // TODO:

  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
  const client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();

  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
  const dbName = "myDatabase";
  const collectionName = "recipes";

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  /*
   * *** FIND DOCUMENTS ***
   *
   * Now that we have data in Atlas, we can read it. To retrieve all of
   * the data in a collection, we call Find() with an empty filter.
   * The Builders class is very helpful when building complex
   * filters, and is used here to show its most basic use.
   */

  const findQuery = { prepTimeInMinutes: { $lt: 145 } };

  try {
    const cursor = await collection.find(findQuery).sort({ name: 1 });
    await cursor.forEach((item) => {
      recipeArray.push(item);
      console.log(
        `${item.name} has ${item.ingredients.length} ingredients and takes ${item.prepTimeInMinutes} minutes to make.`
      );
    });
    // add a linebreak
    console.log();
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }

  // Make sure to call close() on your client to perform cleanup operations
  await client.close();
}

export default eventHandler(async (event) => {
  const info = getRequestURL(event);
  if (info.pathname.startsWith("/api/mongodb")) {
    // TODO:
    recipeArray.length = 0;
    await run().catch(console.dir);

    return recipeArray;
  }

  if (info.pathname.startsWith("/api/addRecipe")) {
    console.log("addRecipe");
    //console.log(event)
    // TODO:
    // recipeArray.length = 0;
    // await run().catch(console.dir);

    const body = await readBody(event);
    console.log(body);

    return { addRecipe: "addRecipe" };
  }
});
