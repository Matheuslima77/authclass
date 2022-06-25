var formularios = []

function pegarDados (){
    var nome =  document.getElementById("nome")
    var cpf =  document.getElementById("cpf")
    var telefone =  document.getElementById("telefone")
    var email =  document.getElementById("email")
    var endereco =  document.getElementById("endereco")
    console.log(nome)

    if (nome.value != ""){
            
        if(nome.value.length > 3){
            const formulario =  {nome: nome.value, cpf: cpf.value, telefone: telefone.value, email: email.value, endereco: endereco.value}

        formularios.push(formulario)
        
        nome.value = ''
        cpf.value = ''
        telefone.value = ''
        email.value = ''
        endereco.value = ''

        imprimirDados()
        
        }else {
            alert(`Mínimo de caracteres permitidos são três`)
        }
        
    }else {
        alert(`Campo "nome" não pode ser vazio`)
    }
}

function buscarNome(){
    var pesquisa = document.getElementById("pesquisa")
    
    /* console.log(nome.value)
    console.log(cpf.value) */
    var dadosFiltrados = formularios.filter(function(item){ 
         return item.nome.includes(pesquisa.value) || 
                item.cpf.includes(pesquisa.value)  || 
                item.telefone.includes(pesquisa.value)  ||
                item.email.includes(pesquisa.value ) ||
                item.endereco.includes(pesquisa.value) // includes faz a comparação pra ver se há tal string dentro da estring anterior
                //ex: pesquisa.value será verificada dentro de item.nome ou item. qualquer coisa, nessa situação ai
    })
    console.log(dadosFiltrados)
    
    var userR = document.getElementById("userR")
    userR.innerHTML = `
    <tr>
        <th>nome</th>
        <th>cpf</th>
        <th>email</th>
        <th>telefone</th>
        <th>endereco</th>
    </tr>
    `
    dadosFiltrados.map(function(registro){
        var linha=document.createElement("tr")
        linha.innerHTML=`
                <td>${registro.nome.replace(pesquisa.value, "<strong>"+pesquisa.value+"</strong>")}</td>
                <td>${registro.cpf.replace(pesquisa.value, "<strong>"+pesquisa.value+"</strong>")}</td>
                <td>${registro.email.replace(pesquisa.value, "<strong>"+pesquisa.value+"</strong>")}</td>
                <td>${registro.telefone.replace(pesquisa.value, "<strong>"+pesquisa.value+"</strong>")}</td>
                <td>${registro.endereco.replace(pesquisa.value, "<strong>"+pesquisa.value+"</strong>")}</td>

            `
            // replace é para substituir, e necessita de dois parametros, o primeiro é o que quero substituir e o segundo é pelo o que eu quero substituir. No caso acima,  estou sub o valor da pesquisa por ela mesma em negrito.
            //strong é negrito
            // 
        userR.append(linha)
        
    })
}

function imprimirDados (){
    var userR = document.getElementById("userR")
    userR.innerHTML = `
    <tr>
        <th>nome</th>
        <th>cpf</th>
        <th>email</th>
        <th>telefone</th>
        <th>endereco</th>
        <th></th>
    </tr>
`
    formularios.map(function(registro, indice){ //primeiro parametro recebe o valor de cada item, o segundo indica a posição que este mesmo item se encontra. O primeiro assumo seu nome e o segundo sua posição na "fila"
        var linha=document.createElement("tr")
        linha.innerHTML=`
                <td>${registro.nome}</td>
                <td>${registro.cpf}</td>
                <td>${registro.email}</td>
                <td>${registro.telefone}</td>
                <td>${registro.endereco}</td>
                <td><button onclick="excluir(${indice})">excluir</button></td>

            `
        userR.append(linha)
        
    })



}

function excluir(indiceASerExcluido){
    formularios = formularios.filter(function(item, indiceDoItem){
        return indiceDoItem != indiceASerExcluido

    })
    imprimirDados()

}

function limpar(){
    var userR = document.getElementById("userR")
    userR.innerHTML = ''
    
    imprimirDados()
}

function limparTudo(){
    var userR = document.getElementById("userR")
    userR.innerHTML = ''
    
    formularios = []
}

