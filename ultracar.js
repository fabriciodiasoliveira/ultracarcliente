//Formulários
formularioCliente = `<h2>Clientes da oficina</h2>  
<br><form>
    <div class="mb-3">
      <label for="nome" class="form-label">Nome</label>
      <input id="nome" type="text" class="form-control" id="nome" aria-describedby="emailHelp">
      <div id="nomeHelp" class="form-text">Digite aqui o nome do cliente</div>
    </div>
    <div class="mb-3">
      <label for="identidade" class="form-label">Documento de identificação</label>
      <input id="identidade" type="text" class="form-control" id="identidade">
      <div id="identidadeHelp" class="form-text">Digite aqui um documento de identificação do cliente</div>
    </div>
    <div class="mb-3">
      <label for="telefone" class="form-label">Telefone</label>
      <input id="telefone" type="text" class="form-control" id="telefone">
      <div id="telefoneHelp" class="form-text">Digite aqui o telefone do cliente</div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">E-mail</label>
      <input id="email" type="text" class="form-control" id="email">
      <div id="emailHelp" class="form-text">Digite aqui o e-mail do cliente</div>
    </div>
    <div class="mb-3">
      <label for="endereco" class="form-label">Endereço</label>
      <input id="endereco" type="text" class="form-control" id="endereco">
      <div id="enderecoHelp" class="form-text">Digite aqui o endereço do cliente</div>
    </div>
    <button type="button" class="btn btn-primary" onclick="cadastrarCliente()">Gravar</button>
  </form>`;


//Funções POST
function login(){
    axios.post('http://localhost:8080/login', {
        "login":"ultracar@ultracar.com",
        "senha":"ultracar"
    })
    .then(function (response) {
        token = response.data.token;
        //Isto é importante para configurar o axxios para autorização automática
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        exibirToken();
    })
    .catch(function (error) {
        console.log(error);
    });
}

function exibirToken(){
    divToken = document.getElementById("token");
    divToken.innerHTML = token;
    getClientes();
}

function getClientes(){
    axios.request({
    method: "GET",
    url: `http://localhost:8080/clientes`
    }).then(response => {
        conteudo = document.getElementById("conteudo");
        conteudo.innerHTML = "";
        
        clientes = response.data;

        function imprimirClientes(item) {
            conteudo.innerHTML += "<br>"+item.nome+   `<br><p class="d-inline-flex gap-1">
                                        <button id="button`+item.id+`" class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample`+item.id+`" aria-expanded="false" aria-controls="collapseExample">
                                        Carros do cliente
                                        </button>
                                    </p>
                                    <div class="collapse" id="collapseExample`+item.id+`">
                                        <div id="conteudocliente`+item.id+`" class="card card-body">

                                        </div>
                                    </div>`;
            getCarros(item.id);
        }
        clientes.forEach(imprimirClientes);
        conteudo.innerHTML += formularioCliente;
        
    });
}
function getCarros(idCliente){
    axios.get('http://localhost:8080/carros/cliente/'+idCliente)
    .then(resposta => {
        carros = resposta.data;
        conteudoCliente = document.getElementById('conteudocliente'+idCliente);
            function imprimirCarros(item) {
                conteudoCliente.innerHTML += `<p class="d-inline-flex gap-1">
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCarro`+item.id+`" aria-expanded="false" aria-controls="collapseExample">
                  `+item.modelo+`
                </button>
              </p>
              <div class="collapse" id="collapseCarro`+item.id+`">
                <div id="conteudocarro`+item.id+`" class="card card-body">
                  
                </div>
              </div>`;
              getNotas(item.id);
            }
            carros.forEach(imprimirCarros);
        });
}
function getNotas(idCarro){
    url = 'http://localhost:8080/servicos/carro/'+idCarro
    conteudoCarro = document.getElementById(`conteudocarro`+idCarro);
    
    axios.get(url)
    .then(resposta => {
        notas = resposta.data;
        console.log(notas);
        conteudoCliente = document.getElementById('conteudcarro'+idCarro);
            function imprimirNotas(item) {
                data = Date(item.data);
                conteudoCarro.innerHTML ='';
                conteudoCarro.innerHTML += `<p class="d-inline-flex gap-1">
                <button class="btn btn-info" type="button" data-bs-toggle="collapse" data-bs-target="#collapsenota`+item.id+`" aria-expanded="false" aria-controls="collapseExample">
                  `+item.id+`
                </button>
              </p>
              <div class="collapse" id="collapsenota`+item.id+`">
                <div id="conteudonota`+item.id+`" class="card card-body">
                    <div>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="exibirNota('`+item.id+`')">
                        Imprimir
                    </button>
                    </div>
                    `+data+`
                </div>
              </div>`;
            }
            notas.forEach(imprimirNotas);
        });
}
function exibirNota(idNota){
    axios.get('http://localhost:8080/servicos/'+idNota)
    .then(resposta => {
        nota = resposta.data;
        conteudoModal = document.getElementById('conteudomodal');
        axios.get('http://localhost:8080/servicos/carro/'+nota.carro_id)
            .then(resposta => {
                carro = resposta.data;
                
                conteudoModal.innerHTML += `<table width="100%" style=" 
                                                                border: 1px solid gray;
                                                                border-collapse: collapse;
                                                                ">
                                        <tr>
                                            <td>
                                            <p class="text-start"><b>Relatório de diagnóstico</b></p>
                                            </td>
                                            <td>
                                                <p class="text-end">`+Date()+`</p>
                                            </td>
                                        </tr>
                                    </table>
                                    <br>
                                    <table width="100%">
                                        <tr>
                                            <td>
                                                Id do diagnóstico: `+nota.id+`
                                            </td>
                                            <td>
                                                Data do diagnóstico: `+nota.data+`
                                            </td>
                                        </tr>
                                        <tr style="background-color:lightgray;">
                                            <td>
                                                <b>Dados do cliente</b>
                                            </td>
                                            <td>
                                                <b>Dados do cliente</b>
                                            </td>
                                        </tr>
                                    </table>`;
            });
        
        });
}
    
