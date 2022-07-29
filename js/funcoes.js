var jogoIniciado = false, pontos, numeroTentativas, tentativaAtual, quantidadeConjuntosEncontrados, primeiraCarta, combinacaoEncontrada, conjuntosEncontrados, posicoes;

//FUNÇÃO: INICIAR UM NOVO JOGO
function iniciarJogo()
{
    alert("Bem Vindo ao Jogo da Memória!!!\n\nSeu desafio é encontrar todos os pares de figuras escondidas. Você tem 8 tentativas, boa sorte!");
    jogoIniciado = true;
    
    //RESET DE VARIÁVEIS DE CONTROLE
    posicoes                       =  embaralharVetor();
    pontos                         =  0;
    numeroTentativas               =  8;
    quantidadeConjuntosEncontrados =  0;
    primeiraCarta                  =  true;
    combinacaoEncontrada           =  false;
    conjuntosEncontrados           =  [false, false, false, false, false];
    
    //DESABILITANDO O BOTÃO DE PLAY
    document.getElementById("play").disabled     =  true;
    document.getElementById("play").style.cursor =  "default";

    //MOSTRANDO A CONTAGEM DE PONTUAÇÃO E TENTATIVAS RESTANTES
    document.getElementById("pontuacao").innerHTML  =  `Pontuação: ${pontos}`;
    document.getElementById("tentativas").innerHTML =  `Tentativas Restantes: ${numeroTentativas}`;

    //HABILITANDO TODAS AS CARTAS
    for(i=0;i<10;i++)
    {
        document.getElementById(i).disabled     =  false;
        document.getElementById(i).style.cursor =  "pointer";
    }
}


//FUNÇÃO: FINALIZAR O JOGO
function finalizarJogo()
{
    jogoIniciado = false;
    
    //REABILITANDO O BOTÃO DE PLAY
    document.getElementById("play").disabled     =  false;
    document.getElementById("play").style.cursor =  "pointer";
    
    //RETIRANDO A CONTAGEM DE PONTUAÇÃO E TENTATIVAS RESTANTES
    document.getElementById("pontuacao").innerHTML  = "";
    document.getElementById("tentativas").innerHTML = "";
    
    //DESVIRANDO E DESABILITANDO TODAS AS CARTAS
    for(i=0;i<10;i++)
    {
        document.getElementById(i).disabled              =  true;
        document.getElementById(i).style.cursor          =  "default";
        document.getElementById(i).style.backgroundColor =  "yellowgreen";
        document.getElementById("img"+i).src             =  "images/interrogacao.png";
    }
}


//FUNÇÃO: GERAR UM VETOR DE 10 POSIÇÕES COM VALORES DE 0 A 9 EM POSIÇÕES ALEATÓRIAS 
function embaralharVetor()
{
    var numero = [0, 1, 2, 3, 4, 5, 6, 7, 8 , 9];
    var valorAnterior, i, posicaoAleatoria;
    
    //CADA POSIÇÃO, DE 0 A 9, FAZ UMA TROCA DE VALORES COM OUTRA POSIÇÃO ALEATÓRIA
    for(i=0;i<10;i++)
    {
        posicaoAleatoria         =  gerarNovoNumero(0, 9);
        
        valorAnterior            =  numero[i];
        numero[i]                =  numero[posicaoAleatoria];
        numero[posicaoAleatoria] =  valorAnterior;
    }

    return numero;
}


//FUNÇÃO: ESCOLHER UMA CARTA
function escolherCarta(numeroDaCarta)
{
    //CONTROLE PARA QUE A FUNÇÃO SÓ EXECUTE QUANDO O USUÁRIO INICIAR O JOGO
    if(jogoIniciado)
    {
        mostrarCarta(numeroDaCarta);
        
        if(primeiraCarta) //ESCOLHEU A PRIMEIRA CARTA DA TENTATIVA
        {
            //DESABILITANDO A CARTA ESCOLHIDA
            tentativaAtual1 = numeroDaCarta;
            document.getElementById(tentativaAtual1).disabled = true;
            
            primeiraCarta = false;
        }
        else //ESCOLHEU A SEGUNDA CARTA DA TENTATIVA
        {
            tentativaAtual2 = numeroDaCarta;
            primeiraCarta = true;
            numeroTentativas--;
            document.getElementById("tentativas").innerHTML = `Tentativas Restantes: ${numeroTentativas}`;

            //COMPARANDO AS CARTAS DA TENTATIVA ATUAL COM OS CONJUNTOS PRÉ-DEFINIDOS
            for(i=0;i<10;i+=2)
            {
                //COMBINAÇÃO ENCONTRADA
                if(((tentativaAtual1 == posicoes[i]) && (tentativaAtual2 == posicoes[i+1])) || ((tentativaAtual1 == posicoes[i+1]) && (tentativaAtual2 == posicoes[i])))
                {
                    quantidadeConjuntosEncontrados++;
                    combinacaoEncontrada = true;
                    var numeroDoConjunto;
                    
                    //DESCOBRIR QUAL DOS 5 CONJUNTOS PRÉ-DEFINIDOS FOI ENCONTRADO
                    switch(i)
                    {
                        //CONJUNTO 1
                        case 0:
                            numeroDoConjunto = 0;
                            break;
                        
                        //CONJUNTO 2
                        case 2:
                            numeroDoConjunto = 1;
                            break;
                        
                        //CONJUNTO 3
                        case 4:
                            numeroDoConjunto = 2;
                            break;

                        //CONJUNTO 4
                        case 6:
                            numeroDoConjunto = 3;
                            break;

                        //CONJUNTO 5
                        case 8:
                            numeroDoConjunto = 4;
                            break;

                    }

                    //MARCAR O CONJUNTO QUE FOI ENCONTRADO
                    marcarConjunto(numeroDoConjunto);

                    //CÁLCULO E ATUALIZAÇÃO DO VALOR DA PONTUAÇÃO
                    pontos += (numeroTentativas+1) * 150;
                    document.getElementById("pontuacao").innerHTML = `Pontuação: ${pontos}`;
                    
                    //DESABILITAR E DESTACAR O CONJUNTO ENCONTRADO 
                    desabilitarConjunto(tentativaAtual1, tentativaAtual2);

                    break;
                }
            }
            
            //COMBINAÇÃO NÃO ENCONTRADA
            if(!combinacaoEncontrada)
            {
                //DESABILITAR TODAS AS CARTAS TEMPORARIAMENTE
                desabilitarTodasAsCartas();

                //APÓS 1 SEG, ESCONDER NOVAMENTE AS CARTAS VIRADAS E REABILITAR AS CARTAS DOS CONJUNTOS QUE AINDA NÃO FORAM ENCONTRADOS
                setTimeout(function(){
                    document.getElementById("img"+tentativaAtual1).src = "images/interrogacao.png";
                    document.getElementById("img"+tentativaAtual2).src = "images/interrogacao.png";
                    reabilitarConjuntosNaoEncontrados();
                }, 1000);
            }

            combinacaoEncontrada = false;
            
            /*

            FATORES PARA O JOGO SER ENCERRADO: 
            
            - ENCONTRAR TODAS AS COMBINAÇÕES 
            - ESGOTAR O NÚMERO DE TENTATIVAS

            */

            if(quantidadeConjuntosEncontrados == 5) //ENCONTROU TODAS AS COMBINAÇÕES
            {
                //APÓS 0.2 SEG, MOSTRAR MENSAGEM DE VITÓRIA E FINALIZAR O JOGO
                setTimeout(function(){
                    alert("Você conseguiu virar todas as cartas!!! Parabéns!! ^^\n\nPontuação: "+pontos);
                    finalizarJogo();
                }, 200);

            }
            else //AINDA NÃO ENCONTROU TODAS AS COMBINAÇÕES
            {
                if(numeroTentativas == 0) //NÚMERO DE TENTATIVAS ESGOTARAM
                {
                    //APÓS 0.2 SEG, MOSTRAR MENSAGEM DE FIM DE JOGO E FINALIZAR O JOGO
                    setTimeout(function(){
                        alert("Fim de Jogo!! Infelizmente suas tentativas acabaram!\n\nPontuação: "+pontos);
                        finalizarJogo();
                    }, 200);
                }
            }
        }
    }
}


//FUNÇÃO: MOSTRAR O SÍMBOLO DA CARTA
function mostrarCarta(numeroDaCarta)
{
    //CONJUNTO 1: UVA
    if(posicoes[0] == numeroDaCarta || posicoes[1] == numeroDaCarta)
    {
        document.getElementById("img"+numeroDaCarta).src = "images/uva.png";
    }

    //CONJUNTO 2: MAÇÃ
    if(posicoes[2] == numeroDaCarta || posicoes[3] == numeroDaCarta)
    {
        document.getElementById("img"+numeroDaCarta).src = "images/maca.png";
    }

    //CONJUNTO 3: LARANJA
    if(posicoes[4] == numeroDaCarta || posicoes[5] == numeroDaCarta)
    {
        document.getElementById("img"+numeroDaCarta).src = "images/laranja.png";
    }

    //CONJUNTO 4: MELANCIA
    if(posicoes[6] == numeroDaCarta || posicoes[7] == numeroDaCarta)
    {
        document.getElementById("img"+numeroDaCarta).src = "images/melancia.png";
    }

    //CONJUNTO 5: MORANGO
    if(posicoes[8] == numeroDaCarta || posicoes[9] == numeroDaCarta)
    {
        document.getElementById("img"+numeroDaCarta).src = "images/morango.png";
    }
}


//FUNÇÃO: MARCAR CONJUNTOS ENCONTRADOS
function marcarConjunto(numeroDoConjunto)
{
    conjuntosEncontrados[numeroDoConjunto] = true;
}


//FUNÇÃO: DESABILITAR UM CONJUNTO QUE FOI ENCONTRADO
function desabilitarConjunto(carta1, carta2)
{
    document.getElementById(carta1).style.backgroundColor =  "green";
    document.getElementById(carta1).disabled              =  true;

    document.getElementById(carta2).style.backgroundColor =  "green";
    document.getElementById(carta2).disabled              =  true;
}  


//FUNÇÃO: DESABILITAR TODAS AS CARTAS
function desabilitarTodasAsCartas()
{
    for(i=0;i<10;i++)
    {
        document.getElementById(i).disabled = true;
    }
}


//FUNÇÃO: REABILITAR OS CONJUNTOS QUE AINDA NÃO FORAM ENCONTRADOS
function reabilitarConjuntosNaoEncontrados()
{
    for(i=0;i<5;i++)
    {
        if(conjuntosEncontrados[i] == false)
        {
            document.getElementById(posicoes[i*2]).disabled   =  false;
            document.getElementById(posicoes[i*2+1]).disabled =  false;
        }
    }
}


//FUNÇÃO: GERAR NÚMERO ALEATÓRIO
function gerarNovoNumero(min, max)
{
    var numeroEncontrado = false;
    
    while(!numeroEncontrado)
    {
        var numero = Math.round(Math.random() * max);
        
        //CONTROLAR SE O NÚMERO GERADO ESTÁ ENTRE O NÚMERO MÍNIMO E MÁXIMO PASSADOS
        if((numero >= min) && (numero <= max))
        {
            numeroEncontrado = true;
        }
    }

    return numero;
}