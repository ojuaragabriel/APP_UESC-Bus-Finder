# UESC Bus Finder

<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1G2h58ldZzze3qF3bqec0kPsBTzdexQpO" alt="Preview UESC Bus Finder" width="300" />
</p>

Aplicação web para consulta rápida de horários de ônibus que atendem a UESC, IF e SESI, com foco na comunidade acadêmica de Ilhéus.

Acesse a versão em produção: https://uesc-bus-finder.vercel.app

## Sobre o projeto

Extraí e normalizei os horários a partir do PDF oficial da Prefeitura de Ilhéus para alimentar o app.  
Exibe o tempo até o próximo ônibus com base na hora atual, eliminando a consulta manual ao PDF.  
Em uso em versão de testes (eu e usuários próximos); ajustes finais para publicação na Google Play.  
Impacto previsto: após o lançamento, apoiar a comunidade acadêmica (UESC, SESI, IF) e demais usuários da rota.

## Funcionalidades

- Busca de horários por rota e ponto de interesse (UESC, IF, SESI).
- Exibição dos próximos horários a partir da hora atual.
- Indicação do tempo restante até o próximo ônibus.
- Interface responsiva, otimizada para uso em celular.
- Dados centralizados, sem necessidade de abrir o PDF original da Prefeitura.

## Tecnologias utilizadas

- Framework: Next.js 15
- Linguagem: TypeScript
- Estilos: Tailwind CSS
- Ícones e componentes: Radix UI, Lucide React
- Empacotamento mobile: Capacitor (pasta `android`)
- Deploy: Vercel

## Estrutura do projeto

Alguns diretórios principais:

- `src/` código-fonte da aplicação
- `src/app/` rotas e páginas do Next.js
- `public/` assets estáticos
- `resources/` e `docs/` arquivos de apoio
- `android/` configuração para build mobile com Capacitor

Para começar a explorar o código, veja principalmente:

- `src/app/page.tsx`

## Requisitos

Antes de rodar o projeto localmente, é recomendado ter:

- Node.js versão 18 ou superior  
- npm ou outro gerenciador de pacotes compatível

## Como rodar o projeto localmente

1. Clonar o repositório:

   ```bash
   git clone https://github.com/ojuaragabriel/APP_UESC-Bus-Finder.git
   cd APP_UESC-Bus-Finder
   ```

2. Instalar dependências:

   ```bash
   npm install
   ```

3. Iniciar o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acessar no navegador:

   ```text
   http://localhost:9002
   ```

## Deploy

O projeto está configurado para deploy na Vercel:

- Cada push na branch principal pode ser integrado a um novo deploy.
- Arquivo `apphosting.yaml` e configurações de Next.js ajudam a orquestrar o ambiente de produção.

## Próximos passos

- Publicação em loja mobile utilizando o pacote gerado com Capacitor.
- Ajustes de interface a partir do feedback de usuários.
- Possível inclusão de novas rotas e pontos de parada.
