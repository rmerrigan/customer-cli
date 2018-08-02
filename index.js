const mongoose = require("mongoose");

//Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//connect to db
const db = mongoose.connect("mongodb://localhost:27017/customercli");

//Import Model
const Customer = require("./models/customer");

//Add Customer
const addCustomer = customer => {
  Customer.create(customer).then(customer => {
    console.info("New Customer Added");
    db.close();
  });
};

//Find Customer
const findCustomer = name => {
  //Make case insensitive
  const search = new RegExp(name, "i"); //makes name case insensitive
  Customer.find({ $or: [{ firstname: search }, { lastname: search }] }).then(
    customer => {
      console.info(customer);
      console.info(`${customer.length} matches`);
      db.close();
    }
  );
};

//Export All Methods
module.exports = {
  addCustomer,
  findCustomer
};
