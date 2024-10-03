```bash
# all configs and envs stages in ${PROJECT_ROOT}/configs

docker-compose --file configs/docker-compose.yaml --env-file configs/envs/.env.local -p nest_vite_demo up -d
pnpm run docker-compose:up

docker-compose --file configs/docker-compose.yaml --env-file configs/envs/.env.local -p nest_vite_demo down -v
pnpm run docke-compose:down
```
