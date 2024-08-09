## Simple full stack app using Vinxi, React and MongoDB

It was inspired by https://github.com/jherr/vinxi-photos

If you want to try it, make sure to adjust connection string to MongoDB in api/data.ts:

```javascript
 const uri = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;