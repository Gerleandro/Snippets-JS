// Exercicio de sistema de banco com classe e loops em javascript.

// Definindo a classe ContaBancaria
class ContaBancaria {
    // Propriedades
    constructor(numeroConta, saldo = 0) {
        this.numeroConta = numeroConta;
        this.saldo = saldo;
    }
    
    // Métodos
    depositar(valor) { // Método para depositar dinheiro na conta
        this.saldo += valor;
        console.log(`Depósito de R$${valor} na conta ${this.numeroConta} concluído. Novo saldo: R$${this.saldo}`);
    }

    sacar(valor) { // Método para sacar dinheiro da conta
        if (this.saldo >= valor) {
            this.saldo -= valor;
            console.log(`Saque de R$${valor} da conta ${this.numeroConta} concluído. Novo saldo: R$${this.saldo}`);
        } else {
            console.log(`Fundos insuficientes. Saque da conta ${this.numeroConta} falhou!`);
        }
    }

    consultarSaldo() { // Metodo para consultar o saldo da conta
        console.log(`Saldo da conta ${this.numeroConta}: R$${this.saldo}`);
        return this.saldo;
    }
}

// Definindo a classe ClienteBancario
class ClienteBancario {
    // Propriedades
    constructor(nome) {
        this.nome = nome;
        this.contas = {};
    }

    // Métodos
    adicionarConta(numeroConta) { // Método para adicionar uma conta para o cliente
        this.contas[numeroConta] = new ContaBancaria(numeroConta);
        console.log(`Conta ${numeroConta} adicionada para o cliente ${this.nome}`);
    }

    obterConta(numeroConta) {
        if (this.contas.hasOwnProperty(numeroConta)) {
            return this.contas[numeroConta];
        } else {
            console.log(`Conta ${numeroConta} não encontrada para o cliente $ {this.nome}`);
            return null;
        }
     }
}

function exibirMenu() {
    console.log("\n --- MENU ---");
    console.log(" 1. > Adicionar Cliente");
    console.log(" 2. > Adicionar Conta para Cliente");
    console.log(" 3. > Realizar Transação");
    console.log(" 4. > Consultar Saldo");
    console.log(" 5. > Sair...");
    return prompt("Escolha uma opçao: ")
}

// Dicionário para armazenar clientes
let clientes = {};

// Loop Principal para interagir com o sistema
while (true) {
    let escolha = parseInt(exibirMenu());

    switch (escolha) {
        case 1: 
            let nomeCliente = prompt("Digite o nome do cliente: ");
            clientes[nomeCliente] = new ClienteBancario(nomeCliente);
            console.log(`Cliente ${nomeCliente} adicionando.`);
            break;
        case 2:
            let nomeClienteConta = prompt("Digite o nome do cliente: ");
            let cliente = clientes[nomeClienteConta];
            if (cliente) {
                let numeroConta = prompt("Digite o número da conta: ");
                cliente.adicionarConta(numeroConta);
            } else {
                console.log("Cliente não encontrado.");
            }
            break;
        case 3:
            let nomeClienteTransacao = prompt("Digite o nome do cliente: ");
            let clienteTransacao = clientes[nomeClienteTransacao];
            if (clienteTransacao) {
                let numeroContaTransacao = prompt("Digite o número da conta: ");
                let conta = clienteTransacao.obterConta(numeroContaTransacao);
                if (conta) {
                    let tipoTransacao = prompt("Digite 'd' para depositar ou 's' para sacar: ");
                    let valorTransacao = parseFloat(prompt("Digite o valor da transação: "));
                    if (tipoTransacao === "d") {
                        conta.depositar(valorTransacao);
                    } else if (tipoTransacao === "s") {
                        conta.sacar(valorTransacao);
                    } else {
                        console.log("Tipo de transação inválido !");
                    }
                } else {
                    console.log("Conta não encontrada !");
                }
            } else {
                console.log("Cliente não encontrado !")
            }
            break;
        case 4: 
            let nomeClienteSaldo = prompt("Digite o nome do cliente: ");
            let clienteSaldo = clientes[nomeClienteSaldo];
            if (clienteSaldo) {
                let numeroContaSaldo = prompt("Digite o número da conta: ");
                let contaSaldo = clienteSaldo.obterConta(numeroContaSaldo);
                if (contaSaldo) {
                    contaSaldo.consultarSaldo();
                } else {
                    console.log("Conta não encontrada !");
                }
            } else {
                console.log("Cliente não encontrado !");
            }
            break;
        case 5: 
            console.log("Saindo do sistema ... ");
            process.exit(0);
            
        default:
            console.log("Opção inválida. tente novamente.")
    }
}

