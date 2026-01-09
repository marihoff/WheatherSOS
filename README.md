# 🌦️ WeatherSOS

**Plataforma de alertas, prevenção e resposta a desastres climáticos em tempo real**

Projeto de conclusão de curso da **AWS Re/Start – Escola da Nuvem**

---

## 📌 Visão Geral

Eventos climáticos extremos têm se tornado cada vez mais frequentes e intensos em todo o mundo. No Brasil, desastres como enchentes, ciclones, tempestades e ondas de calor vêm causando impactos severos à população, à infraestrutura e à economia.

Um exemplo marcante ocorreu no **Rio Grande do Sul em 2024**, onde mais de **2,3 milhões de pessoas** foram afetadas. Segundo dados do **INPE**, o número de desastres climáticos adversos no Brasil **quase triplicou nos últimos 30 anos**. Estudos do **IPCC, INPE e Embrapa** indicam que esse cenário tende a se agravar nas próximas décadas, com aumento na frequência e intensidade desses eventos.

O **WeatherSOS** surge como uma solução tecnológica para **reduzir danos, salvar vidas e melhorar a comunicação** entre população e autoridades, atuando desde a **prevenção** até a **resposta e recuperação pós-desastre**.

---

## 🎯 Objetivo do Projeto

Criar uma plataforma digital **segura, escalável e confiável** que:

- 🔔 Forneça alertas climáticos em tempo real  
- 📝 Permita o registro de incidentes pela população  
- 🤝 Conecte cidadãos, autoridades e voluntários  
- 🧠 Utilize dados confiáveis e validação por Inteligência Artificial  
- 📡 Reduza falhas de comunicação em situações críticas  

---

## 🧩 Justificativa

Atualmente, existe uma grande lacuna entre:

- A ocorrência do desastre  
- A emissão de alertas eficazes  
- A resposta coordenada entre população e órgãos públicos  

Essa falha aumenta significativamente o número de pessoas afetadas.  
O **WeatherSOS** atua exatamente nesse ponto crítico, oferecendo um **canal confiável, rápido e inteligente** para a gestão de desastres ambientais.

---

## 👥 Stakeholders

### 🏛️ Setor Público
- Monitoramento de áreas de risco  
- Comunicação em tempo real com a população  
- Otimização da alocação de recursos  
- Validação de alertas  
- Integração com Defesa Civil, Bombeiros, Prefeituras e Agentes Ambientais  

### 🏢 Setor Privado
- Proteção de funcionários e ativos  
- Uso da plataforma como ferramenta ESG  
- Integração de dados de sensores, satélites e estações climáticas privadas  

### 👨‍👩‍👧‍👦 Usuários Convencionais
- Segurança pessoal, familiar e patrimonial  
- Recebimento de alertas preventivos  
- Registro de incidentes com impacto social relevante  

---

## 🚀 Funcionalidades do MVP

- 🔔 Alertas em tempo real  
- 🗺️ Mapa de riscos e abrigos  
- 📝 Relato de incidentes com imagens  
- 🆘 Recursos de ajuda emergencial  
- 📡 Comunicação direta entre população e autoridades  

---

## 📈 Roadmap & Requisitos Não Funcionais

### Próximas evoluções:
- ☁️ Escalabilidade avançada em nuvem  
- 🧠 Integração com Inteligência Artificial  
- 🔗 Comunicação P2P  
- 📚 Educação e preparação para desastres  
- 🏠 Planos de emergência familiar  
- 🗺️ Mapeamento comunitário de riscos  
- 📡 Integração com dispositivos IoT  
- ✅ Validação automática de previsões climáticas  

---

## 🏗️ Arquitetura da Aplicação

O **WeatherSOS** utiliza uma **arquitetura serverless na AWS**, focada em:

- 🔐 Segurança  
- ⚡ Baixa latência  
- 📊 Escalabilidade automática  
- ♻️ Alta disponibilidade (Multi-AZ)  

A aplicação está hospedada na região **sa-east-1 (São Paulo)**, garantindo menor latência para usuários brasileiros.

---

## ☁️ Arquitetura AWS – Principais Serviços

### 🔐 Entrada e Segurança
- **AWS Amplify** – Hospedagem do Front-end  
- **AWS WAF** – Proteção contra ataques  
- **Amazon Cognito** – Autenticação e controle de identidade  

### 🔗 API e Comunicação
- **AWS AppSync (GraphQL)** – Comunicação em tempo real e modo offline  

### 🌐 Rede
- **VPC isolada**  
- Subnets públicas e privadas  
- Arquitetura **Multi-AZ**  

### ⚙️ Processamento
- **AWS Lambda** – Execução serverless  
  - Lambda Recepcionista  
  - Lambda Executor  

### 🧠 Dados e Inteligência Artificial
- **Amazon DynamoDB** – Banco NoSQL escalável  
- **Amazon Location Service** – Mapas e geolocalização  
- **Amazon Rekognition** – Validação de imagens com IA  
- **Amazon Pinpoint** – Notificações em massa  

---

## 🔄 Exemplo de Fluxo em um Desastre

1. Usuário registra um incidente com foto  
2. Autenticação via **Amazon Cognito**  
3. Envio do alerta pelo **AWS AppSync**  
4. Validação de segurança pelo **AWS WAF**  
5. Processamento via **AWS Lambda**  
6. Análise da imagem pelo **Amazon Rekognition**  
7. Armazenamento dos dados no **DynamoDB**  
8. Disparo de alertas via **Amazon Pinpoint**  
9. Usuários próximos recebem notificações em tempo real  

---

## 📊 Visualização da Arquitetura

> 📌 Diagrama de arquitetura disponível na documentação do projeto.


🔗 Diagrama AWS:
https://app.diagrams.net/#G15yFTcIRZ4_u1UdlN_R4mNM8vsjVWTLqv
<img width="1245" height="722" alt="Arquitetura EDN drawio" src="https://github.com/user-attachments/assets/eb1ecfc6-2599-4c9e-bae5-4d758dac2e11" />

📌 Gestão do Projeto

📋 Quadro de tarefas (Trello):
https://trello.com/b/N2hw12Z7/weathersos-planejamento-de-sprints-e-backlog-mvp
<img width="943" height="392" alt="Capturar" src="https://github.com/user-attachments/assets/4a3481ef-b216-4c7e-90a4-ec4b827cef52" />

<img width="1092" height="613" alt="Capturar1" src="https://github.com/user-attachments/assets/9435ccdf-f7fd-4af7-a2b8-3ee0791969c1" />


