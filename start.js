// start.js
/**
 * Fichier “réel” de démarrage du serveur (pour dev / prod).
 * 
 * Il importe `app` et `sequelize` depuis server.js, puis appelle `app.listen()`.
 */
require('dotenv').config();
const { app, sequelize } = require('./server');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // 1) Vérifier la connexion à la base de données
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie !');

    // 2) Synchroniser les modèles (créer les tables si elles n'existent pas)
    console.log('🔄 Synchronisation des tables...');
    await sequelize.sync();
    console.log('✅ Tables synchronisées !');

    // 3) Démarrer le serveur HTTP
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erreur de démarrage :', err);
    process.exit(1);
  }
})();
