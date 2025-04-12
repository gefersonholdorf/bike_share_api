# 👨‍💻 Desafio Técnico feito pela IA — Sistema de Locação de Bicicletas
## Contexto:
Nossa empresa está desenvolvendo uma plataforma chamada BikeShare, que permite que usuários aluguem bicicletas em estações espalhadas pela cidade. Você será responsável por desenvolver o MVP da API de backend, que vai gerenciar usuários, bicicletas e as locações.

### 🎯 O que esperamos que você desenvolva:
#### Funcionalidades obrigatórias:
- Cadastro de usuários
  - Nome, email (único), senha (hash).

- Perfil: usuário comum ou administrador.

- Cadastro de bicicletas (apenas administradores)
  - Número de identificação único.
  - Modelo da bike.
  - Status: disponível, alugada, em manutenção.
    
- Locação de bicicletas
  - Um usuário pode alugar apenas uma bicicleta por vez.
  - A bicicleta deve estar disponível.
  - Registre o horário de início da locação.
  - Calcule automaticamente o valor a pagar no fim da locação:
  - R$2,00 por hora ou fração.
  - Finalizar locação
  - Registre o horário de fim.
  - Calcule o tempo total e o valor total da locação.

- Listagem de locações
  - Um endpoint que retorna as locações por usuário (pode ser paginado).
  - Para administradores, listar todas as locações.

🧠 Regras de negócio
- Um usuário não pode alugar mais de uma bicicleta ao mesmo tempo.
- Uma bicicleta não pode ser alugada se estiver com status diferente de disponível.
- O sistema deve registrar todas as locações, mesmo que sejam locações curtas.
- O valor sempre arredonda para cima a quantidade de horas.
- O administrador pode alterar o status da bike manualmente para em manutenção.

🛠️ Requisitos técnicos
- API RESTful usando NestJS com TypeScript.
- Banco de dados MySQL com uso de Prisma.
- Autenticação com JWT.
- Documentação da API com Swagger.
- Código organizado em módulos.

✍️ Extras (não obrigatórios, mas valorizados)
- Testes unitários (com Vitest).
- Middleware de logger de requisições.
- Validação com zod.

📦 Entrega
- Suba seu projeto em um repositório no GitHub.
- Inclua um README explicando:
- Como rodar o projeto.
- Como testar os endpoints.
- O que você faria a mais com mais tempo.
- Você tem até 5 dias corridos após receber o desafio para entregá-lo.

