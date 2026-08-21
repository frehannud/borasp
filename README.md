# BoraSP

## Roteiro rápido de metrô para descobrir São Paulo

O BoraSP é uma experiência de descoberta urbana para quem está circulando por São Paulo e quer decidir rapidamente o que fazer perto de uma estação de metrô.

Em vez de apresentar listas intermináveis e exigir pesquisas em vários aplicativos, o BoraSP combina a estação onde a pessoa está com a intenção do momento e entrega uma recomendação direta, com informações objetivas e acesso rápido à rota.

> Você escolhe onde está e o que quer fazer. O BoraSP encontra o próximo lugar para você.

## Problema

Turistas, visitantes de primeira viagem e moradores recém-chegados frequentemente perdem tempo procurando “o que fazer perto de mim”. A quantidade de opções, avaliações e artigos genéricos pode gerar paralisia por análise, especialmente quando a pessoa está em trânsito e precisa tomar uma decisão rápida.

## Proposta

O fluxo principal do BoraSP é:

1. Informar ou selecionar a estação de metrô.
2. Escolher o tipo de experiência desejada.
3. Informar quanto tempo está disponível.
4. Receber uma recomendação curada.
5. Abrir o caminho até o local no Google Maps.

## Funcionalidades do MVP

- Seleção de estação de metrô com busca.
- Estações iniciais como Paulista, Luz e Pinheiros.
- Escolha rápida de intenção:
  - Rangos;
  - Rolê cultural;
  - Cafés;
  - Compras;
  - Lazer.
- Filtro de tempo entre 30 minutos e 2 horas.
- Uma recomendação direta por vez.
- Informações do local:
  - Nome;
  - Imagem;
  - Categoria;
  - Distância e tempo a pé;
  - Faixa de preço;
  - Descrição curta.
- Ação para abrir a rota no Google Maps.
- Opção “Tentar outro”, limitada a uma alternativa para reduzir indecisão.
- Estado de carregamento temático durante a busca.
- Estados de busca vazia, erro e reinício do fluxo.
- Experiência responsiva, priorizando telas de celular.

## O que o MVP não faz

- Não exige cadastro ou autenticação.
- Não mantém um catálogo infinito de opções.
- Não possui sistema próprio de mapas ou navegação.
- Não oferece avaliações ou comentários abertos.
- Não depende de uma API externa para a curadoria inicial.

## Critérios de sucesso

- **Taxa de aceitação de roteiro:** mais de 60% dos usuários que visualizam uma recomendação clicam em “Abrir no Mapa”.
- **Tempo médio para decisão:** menos de 30 segundos entre abrir o app e selecionar um roteiro.
- **Taxa de rota por estação:** acompanhar a quantidade de roteiros gerados e confirmados em cada estação cadastrada.

## Experiência visual

A identidade do BoraSP é inspirada na linguagem do transporte urbano de São Paulo:

- Azul para estrutura, navegação e ações principais.
- Amarelo para destaque, energia e descoberta.
- Preto e branco para hierarquia e legibilidade.
- Bordas firmes e cantos pouco arredondados, com uma linguagem urbana e funcional.

O tom de voz é jovem, direto, brasileiro e informal na medida certa.

## Tecnologia

O repositório contém o protótipo web do BoraSP, construído com:

- React;
- TypeScript;
- Vite;
- Tailwind CSS;
- Lucide React para ícones;
- Dados locais para a curadoria inicial;
- Google Maps via link de rota.

## Executar localmente

```bash
pnpm install
pnpm --filter @workspace/borasp run dev
```

## Estrutura do fluxo

```text
Estação
   ↓
Intenção
   ↓
Tempo disponível
   ↓
Encontrando o melhor pico...
   ↓
Recomendação
   ↓
Abrir no Google Maps
```

## Contexto do projeto

O BoraSP foi concebido como um protótipo funcional de produto para exploração mobile e descoberta de lugares próximos à rede de metrô de São Paulo. A primeira versão prioriza velocidade de decisão, curadoria e ação imediata.