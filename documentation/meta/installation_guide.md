# Installation guide

In case you can use @antfu/ni, like me. for it you should install here globally before start work.
[Look documentation](https://github.com/antfu-collective/ni)

```bash
pnpm install --no-lockfile

# alternative
npm install --global @antfu/ni
ni
```

Please do not update versions of fastify & nest/swagger, today current patches is peered and not shure that he will be work well in another version sets.

Anyway you can check versioning of project using next commands:

```bash
pnpm outdated

pnpm audit
```

## Adds

As you can see, in preject sets vscode config with eslint and prettier.
