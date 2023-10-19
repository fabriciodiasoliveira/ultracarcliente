function login(){
    axios.post('http://localhost:8080/login', {
        "login":"ultracar@ultracar.com",
        "senha":"ultracar"
    })
    .then(function (response) {
        token = response.data.token;
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
    headers: {
        Authorization: `Bearer ${token}`
    },
    method: "GET",
    url: `http://localhost:8080/clientes`
    }).then(response => {
        conteudo = document.getElementById("conteudo");
        conteudo.innerHTML = "";
        clientes = response.data;

        function imprimirClientes(item) {
            console.log(item);
            conteudo.innerHTML += "<br>"+item.nome+   `<br><p class="d-inline-flex gap-1">
                                        <button id="button`+item.id+`" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample`+item.id+`" aria-expanded="false" aria-controls="collapseExample">
                                        Descrição
                                        </button>
                                    </p>
                                    <div class="collapse" id="collapseExample`+item.id+`">
                                        <div class="card card-body">
                                            <br>`+item.nome.toString()+`
                                            <br>`+item.identidade+`
                                            <br>`+item.endereco+`
                                        </div>
                                    </div>`
        }
        clientes.forEach(imprimirClientes);
    });
}
function lerArquivo(){
    file = "testes.html";
    var reader = new FileReader();
    reader.onload = function(progressEvent){    
      var fileContentArray = this.result.split(/\r\n|\n/);
      for(var line = 0; line < lines.length-1; line++){
        console.log(line + " --> "+ lines[line]);
      }
    };
    reader.readAsText(file);
}