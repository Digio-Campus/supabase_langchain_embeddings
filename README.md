# supabase_langchain_embeddings

Pequeño proyecto de ejemplo sobre como utilizar los embeddings de un modelo de IA ejecutado localmente utilizando Langchain para analizar documentos y guardar los resultados vectorizados en la base de datos. 

## Instalación

>**Requires [Nodejs 20.11.0](https://nodejs.org/en/download)**
>
>**Requires [Supabase](https://supabase.com/)**
>
>**Requires [llamafile](https://github.com/Mozilla-Ocho/llamafile)**

1. Instalamos las dependencias necesarias

```bash
npm install
```
2. Instalamos Supabase siguiendo su documentación oficial

3. Una vez instalado Supabase debemos instalar la extensión [pgvector](https://github.com/pgvector/pgvector), podemos hacerlo desde el Backoffice de Supabase **Database --> Extensions**, o ejecutando el siguiente comando SQL:

```sql
create extension vector;
```

4. Procedemos a crear la tabla donde guardaremos nuestros documentos y sus embeddings vectorizados:

```sql
create table documents (
  id bigserial primary key,
  content text,
  embedding vector(2048)
);
```

5. Procedemos a instalar el llamafile, para la correcta reproducción del entorno de esta aplicación descargamos el binario de [llamafile](https://github.com/Mozilla-Ocho/llamafile/releases/tag/0.7.1) versión 0.7.1.

6. Descargamos el modelo de [TinyLlama](https://huggingface.co/jartine/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/fc0c95fca3c2a84e6032645951ec1d9c77fc336c/TinyLlama-1.1B-Chat-v1.0.Q2_K.gguf) desde [HuggingFace](https://huggingface.co/)



## Uso
1. Ejecutamos Supabase
2. Ejecutamos el modelo de IA con el siguiente comando:
```bash
./llamafile-0.7.1  --server --host 0.0.0.0 --embedding -ngl 0 --model ./TinyLlama-1.1B-Chat-v1.0.Q2_K.gguf
```
3. Y por último ejecutamos el script proporcionado en este repositorio:
```bash
node app_supabase.js
```