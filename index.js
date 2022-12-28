const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();
const ManagerMoventModel = require('./models/managerMovent');
const EmployeeMoventModel = require('./models/employeeMovent');
const DeveloperModel = require('./models/developer');
const ManagerModel = require('./models/manager');
const EmployeeModel = require('./models/employee');
const ReportModel = require('./models/report');
const ScrapedDataModel = require('./models/scrapedData');

mongoose.set('strictQuery', false);
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

app.post('/insert-developer', async (req, res) => {
  const data = {
    developerName: req.body.developerName,
    developerLastname: req.body.developerLastname,
    developerPhoneNumbers: [req.body.developerPhoneNumber],
    developerEmailAddresses: [req.body.developerEmailAddress],
    developerPrimaryPhoneNumber: req.body.developerPhoneNumber,
    developerCredentials: {
      developerPrimaryEmailAddress: req.body.developerEmailAddress,
      developerPassword: req.body.developerPassword
    },
  };
  console.log(data);
  const developer = new DeveloperModel(data);
  try {
    await developer.save();
    res.send({ status: true });
  } catch(error) {
    console.log(error);
    res.send({ status: false });
  }
});

app.post('/insert-manager', async (req, res) => {
  const data = {
    _id: req.body._id,
    managerName: req.body.moventName,
    managerLastname: req.body.moventLastname,
    managerAge: req.body.moventAge,
    managerPhoneNumbers: [req.body.moventPhoneNumber],
    managerPrimaryPhoneNumber: req.body.moventPhoneNumber,
    managerEmailAddresses: [req.body.moventEmailAddress],
    managerCredentials: {
      managerPrimaryEmailAddress: req.body.moventEmailAddress,
      managerPassword: req.body.moventPassword
    },
    managerEmployees: [],
  };
  const manager = new ManagerModel(data);
  try {
    await manager.save();
    res.send('inserted data');
  } catch(error) {
    console.log(error);
  };
});

app.post('/insert-employee', async (req, res) => {
  const data = {
    _id: req.body._id,
    employeeName: req.body.moventName,
    employeeLastname: req.body.moventLastname,
    employeeAge: req.body.moventAge,
    employeePhoneNumbers: [req.body.moventPhoneNumber],
    employeePrimaryPhoneNumber: req.body.moventPhoneNumber,
    employeeEmailAddresses: [req.body.moventEmailAddress],
    employeeCredentials: {
      employeePrimaryEmailAddress: req.body.moventEmailAddress,
      employeePassword: req.body.moventPassword
    },
    employeeManagerId: mongoose.Types.ObjectId(req.body.requestedManagerId),
    employeeReports: [],
  };
  const employee = new EmployeeModel(data);
  try{
    await employee.save();
    console.log(req.body.requestedManagerId, req.body._id);
    await ManagerModel.updateOne(
      { _id: req.body.requestedManagerId }, 
      { $push: { managerEmployees: mongoose.Types.ObjectId(req.body._id) } }
  );
    res.send('inserted data');
  } catch(error) {
    console.log(error);
  }
});

app.delete("/delete-developer/:id", async (req, res) => {
  const { id } = req.params;
  await DeveloperModel.findByIdAndRemove(id).exec();
  res.send(true);
});

app.delete("/delete-employee/:id", async (req, res) => {
  const { id } = req.params;
  await EmployeeModel.findByIdAndRemove(id).exec();
  res.send(true);
});

app.delete("/delete-manager/:id", async (req, res) => {
  const { id } = req.params;
  await ManagerModel.findByIdAndRemove(id).exec();
  res.send(true);
});

app.delete("/delete-employee-movent/:id", async (req, res) => {
  const { id } = req.params;
  await EmployeeMoventModel.findByIdAndRemove(id).exec();
  res.send(true);
});

app.delete("/delete-manager-movent/:id", async (req, res) => {
  const { id } = req.params;
  await ManagerMoventModel.findByIdAndRemove(id).exec();
  res.send(true);
});

app.delete("/delete-report/:id", async (req, res) => {
  const { id } = req.params;
  await ReportModel.findByIdAndRemove(id).exec();
});

app.get("/read-report/:id", async (req, res) => {
  const { id } = req.params;
  if (id === 'all') {
    ReportModel.find({}, (err, result) => {
      if(err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    const result = await ReportModel.find({ reporterEmployeeId: mongoose.Types.ObjectId(id) }).exec();
    res.send(result);
  }
});

app.get("/read-scraped-data", (req, res) => {
  ScrapedDataModel.find({}, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
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

app.get("/read-employee-movent/:managerId", async (req, res) => {
  const { managerId } = req.params;
  if (managerId === 'all') {
    EmployeeMoventModel.find({}, (err, result) => {
      if(err) {
        res.send(err);
      } else {
        res.send(result);
      }
    })
  } else {
    const result = await EmployeeMoventModel.find({ requestedManagerId: managerId }).exec();
    res.send(result);
  }

});

app.get('/read-developer', (req, res) => {
  DeveloperModel.find({}, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});

app.get('/read-manager/:email', async (req, res) => {
  const { email } = req.params;
  if (email === 'all') {
    ManagerModel.find({}, (err,result) => {
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    })
  } else {
    const result = await ManagerModel.find({ 'managerCredentials.managerPrimaryEmailAddress': email }).exec();
    res.send(result);
  }
});

app.get("/read-employee/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  if (employeeId === 'all') {
    EmployeeModel.find({}, (err, result) => {
      if(err) {
        res.send(err);
      } else {
        res.send(result);
      }
    })
  } else {
    const result = await EmployeeModel.find({ _id: employeeId }).exec();
    res.send(result);
  }
});

app.listen(3001, () => {
  console.log('server running on port 3001');
});
