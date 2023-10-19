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
function cadastrarCliente(){
    nome = document.getElementById("nome");
    identidade = document.getElementById("identidade");
    telefone = document.getElementById("telefone");
    email = document.getElementById("email");
    endereco = document.getElementById("endereco");

    json = {
        "nome":nome,
        "identidade":identidade,
        "telefone":telefone,
        "email":email,
        "endereco":endereco
    };
    
    url = `http://localhost:8080/clientes`;

    axios.post(url, json);
    getClientes();
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
        conteudo.innerHTML += formularioCliente;
        clientes = response.data;

        function imprimirClientes(item) {
            console.log(item);
            conteudo.innerHTML += "<br>"+item.nome+   `<br><p class="d-inline-flex gap-1">
                                        <button id="button`+item.id+`" class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample`+item.id+`" aria-expanded="false" aria-controls="collapseExample">
                                        Carros do cliente
                                        </button>
                                    </p>
                                    <div class="collapse" id="collapseExample`+item.id+`">
                                        <div class="card card-body">
                                            <br>`+item.nome.toString()+`
                                            <br>`+item.identidade+`
                                            <br>`+item.endereco+`
                                        </div>
                                    </div>`;
        }
        clientes.forEach(imprimirClientes);
    });
}
    
