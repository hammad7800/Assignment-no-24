var list = document.getElementById("list");
var database = firebase.database();
var todoRef = database.ref("todos");

function addTodo() {
  var input = document.getElementById("todoInput");

  if (input.value === "") {
    alert("fill the field");
    return;
  }

  todoRef.push({
    value: input.value
  });

  input.value = "";
}

todoRef.on("child_added", function (data) {
  var li = document.createElement("li");
  li.id = data.key;

  li.innerHTML = data.val().value + 
    ' <button onclick="deleteItem(\'' + data.key + '\')">Delete</button>' +
    ' <button onclick="editItem(\'' + data.key + '\')">Edit</button>';

  list.appendChild(li);
});

function deleteItem(id) {
  firebase.database().ref("todos/" + id).remove();
  document.getElementById(id).remove();
}

function deleteAllItems() {
  todoRef.remove();
  list.innerHTML = "";
}

function editItem(id) {
  var updatedVal = prompt("Enter updated value");
  firebase.database().ref("todos/" + id).update({
    value: updatedVal
  });
  document.getElementById(id).firstChild.nodeValue = updatedVal;
}
