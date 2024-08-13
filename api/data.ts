import { eventHandler, getRequestURL } from "vinxi/http";
import { readBody } from "vinxi/http";

import { MongoClient, Collection } from "mongodb";
import { Recipe } from "../metadata/recipes";

// Replace the placeholder connection string below with your
// Atlas cluster specifics. Be sure it includes
// a valid username and password! Note that in a production environment,
// you do not want to store your password in plain-text here.
import userData from "../../cred/mongodb0.mjs"; //this hides credentials, change to set yours
// const userData = ["userName","password", "cluster0.something"]
// export default userData;
const [user, password, cluster] = userData;
const uri = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;

const recipeArray: Recipe[] = [];

type dbCommand = (collection: Collection, recipe?: Recipe) => void;

const addRecipe: dbCommand = async (collection, recipe) => {
  /*
   *  *** INSERT DOCUMENTS ***
   *
   * You can insert individual documents using collection.insert().
   */
  try {
    const insertResult = await collection.insertOne(recipe);
    console.log(insertResult,
      `  successfully inserted.\n`
    );
  } catch (err) {
    console.error(
      `Something went wrong trying to insert the new documents: ${err}\n`
    );
  }
};

const reloadRecipes: dbCommand = async (collection) => {
  
  //clear recipeArray
  recipeArray.length = 0;
  /*
   * *** FIND DOCUMENTS ***
   *
   * Now that we have data in Atlas, we can read it. To retrieve all of
   * the data in a collection, we call Find() with an empty filter.
   * The Builders class is very helpful when building complex  } catch (err) {

   * filters, and is used here to show its most basic use.
   */

  // TODO: implement filter 
  
  //const findQuery = { prepTimeInMinutes: { $lt: 145 } };

  try {
    // const cursor = await collection.find(findQuery).sort({ name: 1 });
    const cursor = await collection.find().sort({ name: 1 });
    while (await cursor.hasNext()) {
      const recipe  = await cursor.next()
      // console.log(recipe)
      recipeArray.push(recipe);
      
    }
   
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
};

async function run(command: dbCommand, recipe?: Recipe) {

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

  // TODO:
  await command(collection, recipe);

  // Make sure to call close() on your client to perform cleanup operations
  await client.close();
}

export default eventHandler(async (event) => {
  const info = getRequestURL(event);
  if (info.pathname.startsWith("/api/mongodb")) {
    // TODO:
    await run(reloadRecipes).catch(console.dir);

    return recipeArray;
  }

  if (info.pathname.startsWith("/api/addRecipe")) {
    console.log("addRecipe");
    //console.log(event)
    // TODO:
    // recipeArray.length = 0;
    // await run().catch(console.dir);

    const body = await readBody(event);
    // body.ingredients.push("sugar")
    console.log(body);
    console.log(typeof body);

    await run(addRecipe, body).catch(console.dir);
    //await run(reloadRecipes).catch(console.dir);

    return recipeArray;
  }
});
