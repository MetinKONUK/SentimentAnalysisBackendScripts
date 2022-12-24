const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();
const EmployeeModel = require('./models/employee');
const EmployeeMoventModel = require('./models/employeeMovent');
const ManagerMoventModel = require('./models/managerMovent');

app.use(express.json());

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));
const CONN_STR = 'mongodb+srv://crystalin:crystalin@crystalin.w93y0ww.mongodb.net/crystalin?retryWrites=true&w=majority';
mongoose.connect(CONN_STR);

app.post('/insert-manager-movent', async (req, res) => {
  const data = {
    moventName: req.body.moventName,
    moventLastname: req.body.moventLastname,
    moventAge: req.body.moventAge,
    moventPhoneNumber: req.body.moventPhoneNumber,
    moventEmailAddress: req.body.moventEmailAddress,
    letterOfRequest: req.body.letterOfRequest,
    moventPassword: req.body.moventPassword,
  };
  const managerMovent = new ManagerMoventModel(data);
  try {
    await managerMovent.save();
    res.send({ status: true, email: req.body.moventEmailAddress });
  } catch(error){
    res.send({status: false});
  }
});

app.post('/insert-employee-movent', async (req, res) => {
  const data = {
    moventName: req.body.moventName,
    moventLastname: req.body.moventLastname,
    moventAge: req.body.moventAge,
    moventPhoneNumber: req.body.moventPhoneNumber,
    moventEmailAddress: req.body.moventEmailAddress,
    letterOfRequest: req.body.letterOfRequest,
    moventPassword: req.body.moventPassword,
    requestedManagerId: mongoose.Types.ObjectId(req.body.requestedManagerId),
  };
  const employeeMovent = new EmployeeMoventModel(data);
  try {
    await employeeMovent.save();
    res.send({status: true, email: req.body.moventEmailAddress});
  } catch (error) {
    res.send({status: false});
  }
});

app.post('/insert-employee', async (req, res) => {
  const data = {
    employeeName: req.body.employeeName,
    employeeLastname: req.body.employeeLastname,
    employeeAge: req.body.employeeAge,
    employeePhoneNumbers: req.body.employeePhoneNumbers,
    employeePrimaryPhoneNumber: req.body.employeePrimaryPhoneNumber,
    employeeEmailAddresses: req.body.employeeEmailAddresses,
    employeeCredentials: req.body.employeeCredentials,
    employeeManagerId: mongoose.Types.ObjectId(req.body.employeeManagerId),
    employeeReports: req.body.employeeReports
  };
  const employee = new EmployeeModel(data);
  try{
    await employee.save();
    res.send('inserted data');
  } catch(error) {
    console.log(error);
  }
});

app.get("/read-manager-movent", (req, res) => {
  ManagerMoventModel.find({}, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});

app.get("/read-employee-movent", (req, res) => {
  EmployeeMoventModel.find({}, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});

app.get("/read-employee", (req, res) => {
  EmployeeModel.find({}, (err, result) => {
    if(err) {
      res.send(err);
    }

    res.send(result);

  })
});

app.listen(3001, () => {
  console.log('server running on port 3001');
});
