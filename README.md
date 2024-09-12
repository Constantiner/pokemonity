# Pokemonity<!-- omit in toc -->

- [Finish your CI setup](#finish-your-ci-setup)
- [Run tasks](#run-tasks)
- [Add new projects](#add-new-projects)
- [Install Nx Console](#install-nx-console)
- [Useful links](#useful-links)
- [Pokemon Data](#pokemon-data)
- [Setting up Elasticsearch for the Project](#setting-up-elasticsearch-for-the-project)
	- [Step 1: Start Elasticsearch](#step-1-start-elasticsearch)
	- [Step 2: Reset Elasticsearch Password](#step-2-reset-elasticsearch-password)
	- [Step 3: Set Elasticsearch Password as an Environment Variable](#step-3-set-elasticsearch-password-as-an-environment-variable)
	- [Step 4: Populate Elasticsearch with Pokémon Data](#step-4-populate-elasticsearch-with-pokémon-data)
		- [1. Create and Populate the **Pokedex** Index](#1-create-and-populate-the-pokedex-index)
		- [2. Create and Populate the **Poketypes** Index](#2-create-and-populate-the-poketypes-index)
		- [3. Create and Populate the **Pokemoves** Index](#3-create-and-populate-the-pokemoves-index)
		- [4. Create and Populate the **Pokeitems** Index](#4-create-and-populate-the-pokeitems-index)
	- [Step 5: Confirm the Data](#step-5-confirm-the-data)
	- [Notes](#notes)
- [Environment Setup](#environment-setup)
	- [Environment Variables](#environment-variables)
	- [Setting Up Environment Files](#setting-up-environment-files)
		- [Example `.env` File](#example-env-file)
		- [Development Environment](#development-environment)
			- [`apps/pokemonity/.env.development.local`](#appspokemonityenvdevelopmentlocal)
		- [Production Environment](#production-environment)
	- [Example `.env.example` Template](#example-envexample-template)
			- [`apps/pokemonity/.env.example`](#appspokemonityenvexample)
- [Running the Nest Server](#running-the-nest-server)
- [Adding Modules, Services, or Controllers to the Nest Application in Nx Monorepository](#adding-modules-services-or-controllers-to-the-nest-application-in-nx-monorepository)
	- [Adding a Controller to the Nest Application](#adding-a-controller-to-the-nest-application)
	- [Adding a Service to the Nest Application](#adding-a-service-to-the-nest-application)
	- [Adding a Module to the Nest Application](#adding-a-module-to-the-nest-application)

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/xkq5Mp0XQO)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve pokemonity
```

To create a production bundle:

```sh
npx nx build pokemonity
```

To see all available targets to run for a project, run:

```sh
npx nx show project pokemonity
```
        
These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/node:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Pokemon Data

Use pokemon JSON data from [pokemon-data.json](https://github.com/Purukitto/pokemon-data.json).

## Setting up Elasticsearch for the Project

### Step 1: Start Elasticsearch

To start an Elasticsearch container locally, use the `elastic-search:start` npm script. This command will start the Elasticsearch container using Docker Compose.

```bash
npm run elastic-search:start
```

This will start the Elasticsearch service on `localhost:9200`.

### Step 2: Reset Elasticsearch Password

You need to set a password for the `elastic` user in Elasticsearch. Run the following command to reset the password:

```bash
docker exec -it elasticsearch /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
```

Save the generated password, as you will need it for further steps, including setting environment variables and for NestJS to connect to Elasticsearch.

### Step 3: Set Elasticsearch Password as an Environment Variable

Before populating Elasticsearch with data, export the `ELASTIC_PASSWORD` environment variable in your terminal using the password from the previous step.

```bash
export ELASTIC_PASSWORD="your_password"
```

### Step 4: Populate Elasticsearch with Pokémon Data

To populate Elasticsearch with Pokémon data, you need to create the required indexes and use the `_bulk` API to import the data.

#### 1. Create and Populate the **Pokedex** Index

Create the `pokedex` index:

```bash
curl -X PUT -u elastic:$ELASTIC_PASSWORD "localhost:9200/pokedex"
```

Then, bulk import the data into the `pokedex` index:

```bash
curl -H "Content-Type: application/json" -X POST -u elastic:$ELASTIC_PASSWORD "localhost:9200/pokedex/_bulk?pretty" --data-binary "@pokedex_bulk.json"
```

#### 2. Create and Populate the **Poketypes** Index

Create the `poketypes` index:

```bash
curl -X PUT -u elastic:$ELASTIC_PASSWORD "localhost:9200/poketypes"
```

Then, bulk import the data into the `poketypes` index:

```bash
curl -H "Content-Type: application/json" -X POST -u elastic:$ELASTIC_PASSWORD "localhost:9200/poketypes/_bulk?pretty" --data-binary "@poketypes_bulk.json"
```

#### 3. Create and Populate the **Pokemoves** Index

Create the `pokemoves` index:

```bash
curl -X PUT -u elastic:$ELASTIC_PASSWORD "localhost:9200/pokemoves"
```

Then, bulk import the data into the `pokemoves` index:

```bash
curl -H "Content-Type: application/json" -X POST -u elastic:$ELASTIC_PASSWORD "localhost:9200/pokemoves/_bulk?pretty" --data-binary "@pokemoves_bulk.json"
```

#### 4. Create and Populate the **Pokeitems** Index

Create the `pokeitems` index:

```bash
curl -X PUT -u elastic:$ELASTIC_PASSWORD "localhost:9200/pokeitems"
```

Then, bulk import the data into the `pokeitems` index:

```bash
curl -H "Content-Type: application/json" -X POST -u elastic:$ELASTIC_PASSWORD "localhost:9200/pokeitems/_bulk?pretty" --data-binary "@pokeitems_bulk.json"
```

### Step 5: Confirm the Data

After populating the data, you can verify that the data was inserted correctly by querying Elasticsearch. For example, to search all data from the `pokedex` index:

```bash
curl -X GET -u elastic:$ELASTIC_PASSWORD "localhost:9200/pokedex/_search?pretty"
```

---

### Notes

- Replace `your_password` with the actual password you set for the `elastic` user.
- Make sure that the corresponding bulk data files (`pokedex_bulk.json`, `poketypes_bulk.json`, `pokemoves_bulk.json`, `pokeitems_bulk.json`) are in the correct directory.

## Environment Setup

To configure your project, you need to set up environment variables. These variables control how the application interacts with services like Elasticsearch and define the application's port for running the server.

### Environment Variables

The following environment variables must be configured for the application to work properly:

| Variable Name              | Description                             | Example Value             |
| -------------------------- | --------------------------------------- | ------------------------- |
| `ELASTICSEARCH_HOST`        | Elasticsearch host                      | `localhost`               |
| `ELASTICSEARCH_PORT`        | Elasticsearch port                      | `9200`                    |
| `ELASTICSEARCH_USERNAME`    | Username for Elasticsearch              | `elastic`                 |
| `ELASTICSEARCH_PASSWORD`    | Password for Elasticsearch              | `your_elastic_password`   |
| `PORT`                      | Port on which the NestJS app will run   | `3000`                    |

### Setting Up Environment Files

You can use different `.env` files to manage your environment variables depending on the environment (e.g., development, production). The environment file should contain the above variables, and you can define them based on your environment.

#### Example `.env` File

For a typical setup, you would have a `.env` file that looks like this:

```ini
# Elasticsearch configuration
ELASTICSEARCH_HOST=localhost
ELASTICSEARCH_PORT=9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=your_elastic_password

# Application configuration
PORT=3000
```

#### Development Environment

For local development, create a file called `.env.development.local` in the `apps/pokemonity` directory. You can use the following structure as a template:

##### `apps/pokemonity/.env.development.local`

```ini
# Elasticsearch configuration
ELASTICSEARCH_HOST=localhost
ELASTICSEARCH_PORT=9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=your_elastic_password

# Application configuration
PORT=3000
```

This file will override the values in your `.env` file during development.

#### Production Environment

For production, create a file called `.env.production` and update the variables accordingly.

### Example `.env.example` Template

For convenience, you can create a `.env.example` file as a template that other developers can use to set up their own environment:

##### `apps/pokemonity/.env.example`

```ini
# Elasticsearch configuration
ELASTICSEARCH_HOST=localhost
ELASTICSEARCH_PORT=9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=your_elastic_password

# Application configuration
PORT=3000
```

This file serves as a reference for what variables are required but does not contain any sensitive information.

## Running the Nest Server

To start the NestJS server for the Pokémon app, run the following command:

```bash
npm run serve:pokemonity
```

Once the server is up and running, you can go to the following URL to check the Pokémon search API:

```bash
http://localhost:3000/api/pokemon/search?name=Pikachu
```

This will query Elasticsearch for the Pokémon with the name "Pikachu" and return its data.

## Adding Modules, Services, or Controllers to the Nest Application in Nx Monorepository

In an Nx monorepository, we use `@nx/nest` generators to scaffold new modules, services, or controllers in our NestJS application. For this project, we will be adding these components to the **Nest application** called `pokemonity`.

### Adding a Controller to the Nest Application

To generate a new controller in the Nest application, use the following command:

```bash
npx nx g @nx/nest:controller elasticsearch --project=pokemonity
```

This will generate a new controller under the `elasticsearch` feature in the **`pokemonity`** Nest application.

### Adding a Service to the Nest Application

To generate a new service in the Nest application, use this command:

```bash
npx nx g @nx/nest:service elasticsearch --project=pokemonity
```

This will generate a new service for the `elasticsearch` feature in the **`pokemonity`** Nest application.

### Adding a Module to the Nest Application

To generate a new module in the Nest application, use the following command:

```bash
npx nx g @nx/nest:module elasticsearch --project=pokemonity
```

This will create a new module for the `elasticsearch` feature in the **`pokemonity`** Nest application.

For more information on using the Nest generators in Nx, visit the official documentation:

[More info on Nx Nest generators](https://nx.dev/nx-api/nest)
