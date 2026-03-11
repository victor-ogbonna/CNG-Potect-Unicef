require('dotenv').config();
const admin = require('firebase-admin');
const { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } = require('@aptos-labs/ts-sdk');

// Initialize Aptos Testnet
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

// Load Petra Wallet Account
const privateKey = new Ed25519PrivateKey(process.env.APTOS_PRIVATE_KEY);
const account = Account.fromPrivateKey({ privateKey });

// Your permanently deployed smart contract address
const MODULE_ADDRESS = "0x1b09dc9b21318455ac6292bd14c5fab06a7cf98632ac5f53868f692141ca0b18";

// Initialize Firebase
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cng-protect-default-rtdb.firebaseio.com/"
});

const db = admin.database();
const liveDataRef = db.ref('/cng_protect/devices/device_01/live_data');

console.log("========================================");
console.log("CNG-Protect Bridge is live!");
console.log(`Aptos Wallet Connected: ${account.accountAddress}`);
console.log("========================================");

let lastLogTime = 0;
const LOG_COOLDOWN_MS = 5000; // 5-second cooldown for testing

liveDataRef.on('value', async (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
        console.log(`\n[FIREBASE PULL] Gas: ${data.gas_level} | Temp: ${data.temperature} | Danger: ${data.is_danger}`);

        const now = Date.now();
        if (data.is_danger && (now - lastLogTime > LOG_COOLDOWN_MS)) {
            console.log(`[APTOS] ⚠️ DANGER DETECTED! Formulating transaction to immutable ledger...`);
            
            try {
                const transaction = await aptos.transaction.build.simple({
                    sender: account.accountAddress,
                    data: {
                        function: `${MODULE_ADDRESS}::alert::log_danger`,
                        functionArguments: [data.gas_level, Math.round(data.temperature)] 
                    },
                });

                const pendingTransaction = await aptos.signAndSubmitTransaction({ signer: account, transaction });
                const executedTransaction = await aptos.waitForTransaction({ transactionHash: pendingTransaction.hash });

                console.log(`[APTOS] ✅ SUCCESS! Data safely secured on-chain.`);
                console.log(`[APTOS] Verify here: https://explorer.aptoslabs.com/txn/${executedTransaction.hash}?network=testnet`);
                
                lastLogTime = now;
            } catch (error) {
                console.error("[APTOS] Failed to log to blockchain:", error);
            }
        }
    }
}, (errorObject) => {
    console.log('Firebase read failed: ' + errorObject.name);
});
