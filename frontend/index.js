
const update = document.querySelector('#updateBtn');
const content = document.querySelector('#content');
const submit = document.querySelector('#submit');

window.addEventListener('load', () => {
    getUsers();
});


submit.addEventListener('click', () => {
    let fullName = document.querySelector('#fullName').value;
    let email = document.querySelector('#email').value;

    let formData = { fullName, email };
    fetch('http://localhost:5000/student/add', {

        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'

        }
    });
    location.reload();
});


function getUsers() {
    let id ='';

    fetch('http://localhost:5000/student')
        .then(response => {
            console.log(response);
            return response.json();

        }).then(data => {
            console.log(data);
            data.forEach(element => {
                id = `${element._id}`;
                
                $('.content').append(`<tr><td>${element.fullName}</td>
                <td>${element.email}</td>
                <td><a href="javascript:void()" class="btn btn-primary btn-sm mr-3" onClick="editStudent('${element._id}')">Edit</a><a href="javascript:void()" class="btn btn-danger btn-sm" onClick="deleteStudent('${element._id}')">Delete</a></td>
            
                </tr>`
                );
            });


        }).catch(error => {
            console.log(error);

        })
};

function deleteStudent(id){
    let formData = {id};
    fetch('http://localhost:5000/student/delete/'+id,{
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'

        }
    }).then(response => response.text())
    .then(response => console.log(response))
    .catch(error => console.log(error));
    location.reload();
}
function editStudent(id){
    fetch(`http://localhost:5000/student/details/`+ id,)
    .then(res => res.json())
    .then( (data) => {
        document.querySelector('#fullName').value = data.fullName;
        document.querySelector('#email').value = data.email;
        document.querySelector('#ID').value = data._id;
    });
  
}

update.addEventListener('click', ()=> {

    let fullName = document.querySelector('#fullName').value;
    let email = document.querySelector('#email').value;
    let id = document.querySelector('#ID').value;
   

    let formData = { fullName, email};

    fetch('http://localhost:5000/student/update/' + id, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    location.reload();
});