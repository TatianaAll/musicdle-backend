# Musicdle Backend Routes

Backend Express minimal pour le MVP.

## Démarrage

Le serveur écoute par défaut sur le port `3001`.

```bash
node server.js
```

## Configuration PostgreSQL

Avant de démarrer, configure les variables d'environnement suivantes :

- `PGHOST`
- `PGPORT`
- `PGDATABASE`
- `PGUSER`
- `PGPASSWORD`

La table `users` est créée automatiquement au démarrage si elle n'existe pas.

## Routes

### `POST /users`

Crée un utilisateur dans PostgreSQL via Prisma.

#### Body JSON

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

#### Réponse `201`

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-04-14T12:00:00.000Z"
}
```

#### Réponse `409`

```json
{
  "message": "email already exists"
}
```

#### Réponse `400`

```json
{
  "message": "name, email and password are required"
}
```

## Notes

- Les utilisateurs sont maintenant stockés dans PostgreSQL.
- Les mots de passe ne sont pas chiffrés dans cette version MVP.
- Ajoute un hash de mot de passe avant la mise en production.