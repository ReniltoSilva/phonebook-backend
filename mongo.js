// const mongoose = require("mongoose");

// // if (process.argv.length < 4) {
// //   console.log("give password as argument");
// //   process.exit(1);
// // }

// if (!process.argv[2]) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

// const url = `mongodb+srv://fullstack:${password}@cluster0.si9mrwi.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: name,
//   number: number,
// });

// if (process.argv.length < 4) {
//   //Command to find and list all documents from phonebookApp
//   Person.find({}).then((result) => {
//     result.forEach((person) => {
//       console.log(`${person.name} ${person.number}`);
//     });
//     mongoose.connection.close();
//   });
// }
// //Command to add document to 'people' collection
// else
//   person.save().then((result) => {
//     console.log(`Added ${result.name} number ${result.number} to phonebook`);
//     mongoose.connection.close();
//   });

// // //Command to update properties from document using 'updateOne' method
// // Person.updateOne(
// //   { name: "Arto Hellas" },
// //   { $set: { number: "040-123456" } }
// // ).then((result) => {
// //   console.log(result);
// //   mongoose.connection.close();
// // });

// // //Command to delete document from database
// // Person.deleteOne({ _id: "68bfcf656687b6df6001c7d0" }).then((result) => {
// //   console.log(result);
// //   mongoose.connection.close();
// // });
