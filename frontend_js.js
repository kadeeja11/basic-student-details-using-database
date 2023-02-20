var selectedRow = null


// Form Submit Function
function onFormSubmit() {
    // check validity
    if (validate()) {
        // store user data
        var formData = readFormData();
        // check empty row
        insertNewRecord(formData);
        // Reset Input Values
        resetForm();
    }
}

/*function action() {
    var formDat = readFormData();
    var requesBody = JSON.stringify(formDat);
    updateRecord(requesBody);
}*/

async function getStudents() {

    var table1 = document.getElementById("fromdb");


    const response = await fetch('http://localhost:3000/getstudents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      console.log(myJson)

      console.log(myJson.length)

      for (var i = 0; i < myJson.length; i++) {
        var student = myJson[i];
        var row = table1.insertRow(-1); // -1 to append at end of table
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = student.username;
        cell2.innerHTML = student.rollno;
        cell3.innerHTML = student.dob;
        cell4.innerHTML = student.gender;
        cell5.innerHTML = student.phone;
        var ids = student.rollno;
        /*var list = {};
        list["name"] = student.username;
        list["rollno"] = student.rollno;
        list["dob"] = student.dob;
        list["gender"] = student.gender;
        list["phone"] = student.phone;*/
        cell6.innerHTML = /*"<button id = 'btnEdt'; onclick = 'updateRecord(\"" +list+ "\")' > Edit</button>*/"<button id='btnDlt'; onclick = 'deleteRecord(\"" +ids + "\")' >Delete</button>";
      }console.log("outside");
    }


function readFormData(){
    var formData = {};
    formData["userName"]= document.getElementById("userName").value;
    formData["rollNo"]= document.getElementById("rollNo").value;
    formData["dob"]= document.getElementById("DOB").value;
    formData["gender"]= document.getElementById("Gender").value;
    formData["phone"]= document.getElementById("Phone").value;

    console.log(formData);
    return formData;
}

async function insertNewRecord(formData){

    console.log(formData)

    var requestBody = JSON.stringify(formData);

    console.log(requestBody)

    console.log("Entered insert record function")

    //Http calls
        const response = await fetch('http://localhost:3000/addstudent', {
          method: 'POST',
          body: requestBody, // string or object
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(myJson)
        


}

async function updateRecord(items) {
    document.getElementById("userName").value = items["name"];
    document.getElementById("rollNo").value = items["rollno"];
    document.getElementById("DOB").value = items["dob"];
    document.getElementById("Gender").value = items["gender"];
    document.getElementById("Phone").value = items["phone"];
    selectedRow = null;
    

}

async function deleteRecord(user_rollno) {

    /*console.log(user_rollno); 
    const reqdelete = await fetch('http://localhost:3000/deleteStudent');
    const resdelete = await reqdelete.json();
    requestBody(resdelete);*/
    //Http calls
    var data = {};
    data["rollno"] = user_rollno;
    var requestBody = JSON.stringify(data);
    const response = await fetch('http://localhost:3000/deleteStudent', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody,
      });
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      console.log(myJson)

}


function resetForm() {
    document.getElementById("userName").value = "";
    document.getElementById("rollNo").value = "";
    document.getElementById("DOB").value = "";
    document.getElementById("Gender").value = "";
    document.getElementById("Phone").value = "";
    selectedRow = null;
}

function validate() {
    isValid = true;
    // userName validation
    if (document.getElementById("userName").value == "") {
        isValid = false;
        document.getElementById("userNamevalidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("userNamevalidationError").classList.contains("hide"))
        {
            document.getElementById("userNamevalidationError").classList.add("hide");
        }
    }
    // Roll No validation
    if (document.getElementById("rollNo").value == "") {
        isValid = false;
        document.getElementById("rollNovalidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("rollNovalidationError").classList.contains("hide"))
        {
            document.getElementById("rollNovalidationError").classList.add("hide");
        }
    }
    // DOB validation
    if (document.getElementById("DOB").value == "") {
        isValid = false;
        document.getElementById("DOBvalidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("DOBvalidationError").classList.contains("hide"))
        {
            document.getElementById("DOBvalidationError").classList.add("hide");
        }
    }
    // Gender validation
    if (document.getElementById("Gender").value == "") {
        isValid = false;
        document.getElementById("GendervalidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("GendervalidationError").classList.contains("hide"))
        {
            document.getElementById("GendervalidationError").classList.add("hide");
        }
    }
    // Phone validation
    if (document.getElementById("Phone").value == "") {
        isValid = false;
        document.getElementById("PhonevalidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("PhonevalidationError").classList.contains("hide"))
        {
            document.getElementById("PhonevalidationError").classList.add("hide");
        }
    }
    return isValid;
}