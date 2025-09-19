# 🔐 Configuration des Secrets GitHub Actions

Ce fichier explique comment configurer les secrets nécessaires pour la CI/CD GitHub Actions.

## 📋 Secrets Requis

Pour que la CI/CD fonctionne correctement, vous devez configurer les secrets suivants dans votre repository GitHub :

### 1. Secrets DockerHub

Allez dans **Settings > Secrets and variables > Actions** et ajoutez :

| Secret Name | Description | Exemple |
|-------------|-------------|---------|
| `DOCKERHUB_USERNAME` | Nom d'utilisateur DockerHub | `sterenova` |
| `DOCKERHUB_TOKEN` | Token d'accès DockerHub | `dckr_pat_xxxxxxxxxxxxxxxx` |

### 2. Comment obtenir un token DockerHub

1. Connectez-vous à [DockerHub](https://hub.docker.com)
2. Allez dans **Account Settings > Security**
3. Cliquez sur **New Access Token**
4. Donnez un nom au token (ex: "GitHub Actions CI/CD")
5. Sélectionnez les permissions : **Read, Write, Delete**
6. Copiez le token généré
7. Ajoutez-le comme secret `DOCKERHUB_TOKEN` dans GitHub

### 3. Configuration du Repository

1. **Fork ou clone** ce repository
2. Allez dans **Settings > Secrets and variables > Actions**
3. Cliquez sur **New repository secret**
4. Ajoutez les secrets listés ci-dessus

## 🚀 Test de la CI/CD

Une fois les secrets configurés :

1. **Push** sur la branche `main` ou `develop`
2. Allez dans l'onglet **Actions** de votre repository
3. Vérifiez que le workflow `Build and Push Docker Images` s'exécute
4. Les images seront automatiquement buildées et pushées vers DockerHub

## 📊 Images Générées

Les images suivantes seront disponibles sur DockerHub :

```
sterenova/sterenova-flux-backend:latest
sterenova/sterenova-flux-frontend:latest
sterenova/sterenova-studio-backend:latest
sterenova/sterenova-studio-frontend:latest
sterenova/sterenova-client-management:latest
```

## 🔄 Tags Automatiques

Le workflow génère automatiquement les tags suivants :

- **Branches** : `main`, `develop`
- **Pull Requests** : `pr-123`
- **Tags** : `v1.0.0`, `1.0.0`, `1.0`, `1`
- **Latest** : Toujours la dernière version de la branche `main`

## 🛡️ Sécurité

- Les secrets sont chiffrés et ne sont jamais visibles dans les logs
- Les tokens DockerHub ont des permissions limitées
- Le scan de sécurité Trivy vérifie les vulnérabilités
- Les images sont signées et vérifiées

## 🆘 Dépannage

### Erreurs courantes

1. **"Docker login failed"** : Vérifiez `DOCKERHUB_USERNAME` et `DOCKERHUB_TOKEN`
2. **"Build failed"** : Vérifiez les Dockerfiles et la syntaxe
3. **"Push failed"** : Vérifiez les permissions du token DockerHub

### Logs

Consultez les logs dans **Actions > Workflow runs** pour diagnostiquer les problèmes.

---

**⚠️ Important : Ne commitez jamais vos secrets dans le code !**
