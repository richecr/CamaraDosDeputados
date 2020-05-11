# Contributing
> Pode contribuir a vontade, você será sempre bem-vindo. Mas aqui tem algumas regras para serem seguidas.

## Adicionar/Atualizar funcionalidades

Você olhou a aplicação e pensou em alguma funcionalidade que deveria ser adicionada no projeto ? :open_mouth:

***Então, você tem duas opções:***

- [Abrir uma issue detalhando sua ideia](#criando-uma-issue)
- [Você mesmo implementar a funcionalidade](#contribuir-com-implementação)

## Criando uma issue

Na página do [projeto](https://github.com/Rickecr/AppCamaraDosDeputados), você pode clicar no botão `Issues` e na página irá aparecer um botão `new issue`, então é só selecionar e seguir os seguintes passos:

- Selecione o tipo da sua issue: `Bug ou Feature`.
- Dê um bom nome a sua issue.
- Detalhe bem sobre qual objetivo da issue.
- Imagens caso possível.
- Selecione labels para sua issue.
- Por fim, clique em `Submit new issue`.

## Contribuir com implementação

Todos os arquivos estão na pasta `src`, os componentes em: `src/Components/` dentro da pasta, você encontrará todas as seções da aplicação e então poderá fazer suas alterações. Os arquivos de rotas ficam em: `src/routes.js` aqui você poderá adicionar novas rotas a aplicação. E não esqueça de avisar na issue que você esta trabalhando, caso ainda não exista, crie, isso vai evitar que duas pessoas trabalhem na mesma issues.

### Clonar o repositório

Na página inicial do [repositório](https://github.com/Rickecr/AppCamaraDosDeputados) tem um botão `Fork`. Ao clicar é só esperar concluir o fork. E então ele irá criar o repositório na sua conta. E agora é só clonar em sua máquina, assim:

```sh
git clone https://github.com/Rickecr/CamaraDosDeputados.git
```

Ao concluir, você terá o repositório em seu computador e então é só abrir em seu editor preferido e fazer suas modificações.

Ao terminar suas modificações, você deve commitar suas alterações, mas primeiro:

```sh
git add .
```

O comando acima irá preparar todos os arquivos modificados para serem commitados(você deve estar dentro da pasta do projeto para usar o comando). Agora é só commitar as alterações:

```sh
git commit -m "<Sua_Mensagem>"
```

E por fim, você irá enviar as alterações para o repositório remoto:

```sh
git push origin master
```

Mas isso só irá alterar no seu fork, o repositório oficial não vai ter suas alterações e agora ? :confused:

Calma, agora que entra o `Pull Request` ou `PR`

### Fazendo uma Pull Request

Na página do seu fork irá aparecer uma mensagem em amarelo solicitando que você faça uma Pull Request para o repositório original. Ao clicar irá abrir uma página para você preencher as informações sobre sua PR.

- Referencie a issue em que você está trabalhando usando `#<numero_da_issue>`

- Descreva suas modificações

- Espere pela avaliação da sua PR, e pode ocorrer de pedimos algumas alterações a seres feitas



