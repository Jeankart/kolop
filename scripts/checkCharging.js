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

async function checkCharging() {
  try {
    console.log('📋 Documentos de Charging:\n');

    const snapshot = await db
      .collection('wallpapers')
      .where('category', '==', 'Charging')
      .get();

    snapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`${data.name}:`);
      console.log(`  - category: ${data.category}`);
      console.log(`  - image: ${data.image}`);
      console.log(`  - id: ${doc.id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkCharging();
