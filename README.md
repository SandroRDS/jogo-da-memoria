<h1> 
<p align="center"> MINI-GAME: JOGO DA MEMÓRIA 🧠 </p>

<p align="center"> 
    <img src="images/html.png">
    <img src="images/css.png">
    <img src="images/javascript.png">
</p>
</h1>

[#APRENDI NA ALURA](https://www.alura.com)

> &#x1F517; Link do Projeto:  
&#x27A1; https://sandrords.github.io/jogo-da-memoria/

> Tipo de Projeto: *Pessoal* &#x1F4DA;

> Status do Projeto: *Versão 1 Completa* &#10004;&#x1F6A7;

## Descrição ##

O projeto consiste na construção do clássico "Jogo da Memória", onde diversos pares de cartas são distribuídos aleatoriamente e o objetivo do jogador é encontrar todos os conjuntos antes das suas tentativas esgotarem.

<p align="center">
<img src="images/gameplay.gif" width="800px">
<br>
Interface do Jogo e Gameplay
</p>

## Regras do Jogo ##

As regras são simples: o jogador tem **8 tentativas** para encontrar o máximo de conjuntos possíveis que estão distribuídos aleatoriamente entre as 10 cartas.

### Pontuação ###
A quantidade de pontos que serão computados após encontrado um novo conjunto é determinada pela seguinte fórmula:

```javascript
    pontuacao += 1500 * quantidadeDeTentativasRestantes;
```
Desta forma, quanto mais tentativas o jogador possuir, mais pontos ele irá adquirir após encontrar um novo conjunto.

## Ferramentas Utilizadas ##

* ***HTML*** e ***CSS***: Criação e estilização dos elementos da página
* ***JavaScript***: Funcionamento de todo algoritmo do jogo.