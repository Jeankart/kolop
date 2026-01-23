#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const serviceAccountPath = path.join(__dirname, '../firebase-service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function checkData() {
  try {
    console.log('📋 Documentos por categoría:\n');

    const categories = ['Featured', 'Live', 'Charging', 'AI', 'Aesthetic'];

    for (const category of categories) {
      const snapshot = await db
        .collection('wallpapers')
        .where('category', '==', category)
        .get();

      console.log(`${category}: ${snapshot.size} documentos`);
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${data.name} (${data.category})`);
      });
      console.log('');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkData();
