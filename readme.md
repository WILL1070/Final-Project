# README.md
# Portfolio Project

## Features
- Contact form with database
- Cloudflare Workers API
- Tailwind UI

## Setup
1. npm install -g wrangler
2. wrangler d1 create portfolio-db
3. Update wrangler.toml
4. wrangler d1 execute portfolio-db --file=schema.sql
5. wrangler pages dev

## Deploy
wrangler pages deploy
