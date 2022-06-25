const enderecos = []

function pegarDados(){
    var cep = document.getElementById("cep")
    var cidade = document.getElementById("cidade")
    var bairro = document.getElementById("bairro")
    var rua = document.getElementById("rua")
    var numero = document.getElementById("numero")
    var complemento = document.getElementById("complemento")
    if(cep.value > 3 && cep.value != ""){
        const registro = {cep: cep.value, cidade: cidade.value, bairro: bairro.value, rua: rua.value, numero: numero.value, complemento: complemento.value}
    enderecos.push(registro)
    
    cep.value = ''
    cidade.value = ''
    bairro.value = ''
    rua.value = ''
    numero.value = ''
    complemento = ''

    } else{
        alert('O campo "nome" não pode conter menos de 3 caracteres!')
    }
    console.log(enderecos)
    imprimirDados()
}

function imprimirDados(){
    var colunaDireita = document.getElementById("colunadireita")
    colunaDireita.innerHTML = `
    <tr>
        <th>CEP</th>
        <th>Cidade</th>
        <th>Bairro</th>
        <th>Rua</th>
        <th>Numero</th>
        <th>Complemento</th>

    </tr>`

    enderecos.map(function(item){
        var impressao = document.createElement("tr")
        impressao.innerHTML = `
            <td>${item.cep}</td>
            <td>${item.cidade}</td>
            <td>${item.bairro}</td>
            <td>${item.rua}</td>
            <td>${item.numero}</td>
            <td>${item.complemento}</td>
            `
        colunaDireita.append(impressao)

    })
}



function getAddress () {
    var cep = document.getElementById("cep")
    var cidade = document.getElementById("cidade")
    var bairro = document.getElementById("bairro")
    var rua = document.getElementById("rua")
    var numero = document.getElementById("numero")
    var complemento = document.getElementById("complemento")

    fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
      .then(res => res.json())
      .then(data => {
        cidade.value = data.localidade
        bairro.value = data.bairro
        rua.value = data.logradouro
        
      })
  }
  
async function getPoliticians (state) {
    const res = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados`)
    const data = await res.json()
    return data.dados.filter(politician => politician.siglaUf === state)
}

async function getGithubProfile(username){
    const res = await fetch(`https://api.github.com/users/${username}/events/public`)
    const data = await res.json()
    return data[5]["payload"]["commits"][0] //essa sequência foi utilizada para chegar até o local do conteúdo desejado
    
}


 function bla(){
    var cep = document.getElementById("cep")
    var cidade = document.getElementById("cidade")
    var bairro = document.getElementById("bairro")
    var rua = document.getElementById("rua")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "cep":cep.value,
      "cidade":cidade.value,
      "bairro":bairro.value,
      "rua":rua.value,

    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://196a-187-127-149-156.ngrok.io/addUser", requestOptions)
      .then(response => response.text())
      .then(result => carregarDados())
      .catch(error => console.log('error', error));
    
 }
  function carregarDados(){
      
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://196a-187-127-149-156.ngrok.io/listUsers", requestOptions)
      .then(response => response.json())
      .then(result => {
          var coluna = document.getElementById("colunadireita")
          coluna.innerHTML = ''
          result.map(function(item){
              var div = document.createElement("div")
              div.innerHTML = `${item.cep}, ${item.cidade}, ${item.bairro}, ${item.rua}, <button onclick="excluir(${item.id})">X</button>`
              coluna.append(div)
              console.log(coluna)
          })
      })
      .catch(error => console.log('error', error));
  }
/* function bietPoliticians (state) {
    return fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/`)
      .then(res => res.json())
      .then(data => {
        return data.dados.filter(politician => politician.siglaUF === state)
      })
  } */

/*   JSON.stringify({nome: "matheus"}) -> estou transformando em string
  '{"nome":"matheus"}'
  JSON.parse('{"nome":"matheus"}') -> estou transformar string em objeto
  {nome: 'matheus'}
  localStorage.setItem("resgistro", JSON.stringify({aula: "um"})) -> estou inserindo um dado no localStorage (criando uma var e atribuindo valor a ela)
  undefined
  localStorage
  localStorage.getItem("resgistro") -> getItem aciona um item/dado de tal local, depende do contexto de sua utilização
  '{"aula":"um"}'
  JSON.parse(localStorage.getItem("resgistro"))
  {aula: 'um'} */



// put = att
// .then - aguarda um resultado/promessa e passar para
// raw - envio de dados
carregarDados()

function pesquisar(){
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "DCK=Dck04|Yli7o|Yli7J");

  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://dadosabertos.camara.leg.br/api/v2/deputados", requestOptions)
    .then(response => response.json())
    .then(result => {
      var impressao = document.getElementById("impressao")
      impressao.innerHTML = ''
        result.dados.map(function(item){
            var linha = document.createElement("div")
            linha.innerHTML = `<td>${item.nome}</td>`
            impressao.prepend(linha)
            console.log(item.nome)

        })
    })
    .catch(error => console.log('error', error));



}