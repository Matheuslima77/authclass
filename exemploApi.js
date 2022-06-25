listData()

function post(){
   
    var name = document.getElementById('userName')
    var email = document.getElementById('userEmail')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": `${name.value}`,
    "email": `${email.value}`
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3500/clientes", requestOptions)
    .then(response => response.text())
    .then(result => {listData()})
    .catch(error => console.log('error', error));
}

function get(x){

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:3500/clientes", requestOptions)
  .then(response => response.json())
  .then(result => x(result))
  .catch(error => console.log('error', error));
}
// esse x estava como cliente
function listData(){
    get(function(x){
      imprimirDados(x.data)
    })
}

function imprimirDados (clientes){
  var userR = document.getElementById("userR")
  userR.innerHTML = `
  <tr>
      <th>nome</th>
      <th>email</th>
  </tr>
`
  clientes.map(function(registro){ //primeiro parametro recebe o valor de cada item, o segundo indica a posição que este mesmo item se encontra. O primeiro assumo seu nome e o segundo sua posição na "fila"
      var linha=document.createElement("tr")
      linha.innerHTML=`
              <td>${registro.name}</td>
              <td>${registro.email}</td>
              <td><button onclick="excluir('${registro._id}')">excluir</button></td>
          `
      userR.append(linha)
      
  })
}


function excluir(id){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`http://localhost:3500/clientes/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      listData();
      alert('registro excluido com sucesso')
    })
    .catch(error => console.log('error', error));

}
