const data = { //object has two properties
    employees: require('../model/employees.json'), //initialized by json file
    setEmployees: function (data) {this.employees = data} //func allows update/ovrwrite emplo prop in data
}

const getAllEmployees = (req, res)=>{ //http method get
    res.json(data.employees);
};

const createNewEmployee = (req, res)=>{ //http method post
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1, //last empl in json and adding 1 to it. 
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname){ //if empty
        return res.status(400).json({
            "message" : "First and last name are required",
        });
    }

    //set employees to the information
    //uses spread opr to expand array/objt
    //so 
    data.setEmployees([...data.employees, //copy all the existing emp into a new arr 
        newEmployee //new objt that is added
    ]);

    res.status(200).json(data.employees);
}

const updateEmployee = (req, res)=>{
    const employee = data.employees.find(
        emp=>emp.id === parseInt(req.body.id)
    ); //find id that matche with the id sent by user

    if(!employee){
        return res.status(400).json({"message":`Employee ID ${req.body.id} not found.`}); 
    }
    if(req.body.firstname) employee.firstname = req.body.firstname; //id matches, update info

    if(req.body.lastname) employee.lastname = req.body.lastname; //id matches, update info

    //contain all emp except for the one being updated: to replace old data with new one
    const filteredArray = data.employees.filter(
        emp => emp.id !== parseInt(req.body.id)
    );

    //array of all emp + new one
    const unsortedArray = [...filteredArray, employee];

    //sort in ascending order
    data.setEmployees(unsortedArray.sort((a,b) => 
    a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    //return the updated arr
    res.json(data.employees);
}

const deleteEmployee = (req, res)=>{
    const employee = data.employees.find(
        emp=>emp.id === parseInt(req.body.id)
    ); //find id that matche with the id sent by user

    if(!employee){
        return res.status(400).json({"message":`Employee ID ${req.body.id} not found.`}); 
    }

    const filteredArray = data.employees.filter(
        emp => emp.id !== parseInt(req.body.id)
    );

    data.setEmployees([...filteredArray]);
    res.json(data.employees);

}

const getEmployee = (req, res)=>{ 
    const employee = data.employees.find(emp=>emp.id === parseInt(req.params.id));
    if(!employee){
        return res.status(400).json({"message":`Employee ID ${req.params.id} not found.`}); 
    }
    res.json(employee);
}


module.exports = {
    getAllEmployees, 
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}