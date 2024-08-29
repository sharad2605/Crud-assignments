function handleFormSubmit(event){

    event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/37f4a57e55d44bfe8377df5f4c5be3af/data",
        userDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));

      
      // Clearing the input fields
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
}

function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
      localStorage.removeItem(userDetails.email);
    });

    editBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        localStorage.removeItem(userDetails.email);
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;
      });
    }

    window.addEventListener("DOMContentLoaded",()=>{
      axios.get("https://crudcrud.com/api/37f4a57e55d44bfe8377df5f4c5be3af/data")
      .then((response)=>{
        console.log(response);
        for(var i=0;i<response.data.length;i++)
          {
            displayUserOnScreen(response.data[i]);
          }
      })
      .catch((err)=>{
        console.log(err);
      })
    })