<h1> 
<p align="center"> MINI-GAME: JOGO DA MEMÓRIA 🧠 </p>

<p align="center"> 
    <img src="images/html.png">
    <img src="images/css.png">
    <img src="images/javascript.png">
</p>
</h1>

<p align="center"> 
<a href="#descricao">Descrição</a> &bull; <a href="#regras">Regras do Jogo</a> &bull; <a href="#ferramentas">Ferramentas Utilizadas</a>
</p>

> &#x1F517; Link do Projeto:  
&#x27A1; https://sandrords.github.io/jogo-da-memoria/

> Tipo de Projeto: *Pessoal* &#x1F4DA;

> Status do Projeto: *Versão 1 Completa* &#10004;&#x1F6A7;

<h2 id="descricao"> Descrição </h2>

O projeto consiste na construção do clássico "Jogo da Memória", onde diversos pares de cartas são distribuídos aleatoriamente e o objetivo do jogador é encontrar todos os conjuntos antes das suas tentativas esgotarem.

<p align="center">
<img src="images/gameplay.gif" width="800px">
<br>
Interface do Jogo e Gameplay
</p>

<h2 id="regras"> Regras do Jogo </h2>

As regras são simples: o jogador tem **8 tentativas** para encontrar o máximo de conjuntos possíveis que estão distribuídos aleatoriamente entre as 10 cartas.

<h3 id="pontuacao"> Pontuação </h3>
A quantidade de pontos que serão computados após encontrado um novo conjunto é determinada pela seguinte fórmula:

```javascript
    pontuacao += 1500 * quantidadeDeTentativasRestantes;
```
Desta forma, quanto mais tentativas o jogador possuir, mais pontos ele irá adquirir após encontrar um novo conjunto.

<h2 id="ferramentas"> Ferramentas Utilizadas </h2>

* ***HTML*** e ***CSS***: Criação e estilização dos elementos da página
* ***JavaScript***: Funcionamento de todo algoritmo do jogo.

---
Made by &#128153; [SandroRDS](https://www.linkedin.com/in/sandro-rosa-de-souza-02a5bb241/) &#128153; | &#x1F47E; Mais Projetos: https://github.com/SandroRDS?tab=repositories 