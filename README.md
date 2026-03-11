# 🛡️ CNG-Protect: Immutable Safety for Student Transit

**The World's First Decentralized Blackbox for Compressed Natural Gas (CNG) Vehicles.**

[![Aptos Blockchain](https://img.shields.io/badge/Aptos-Blockchain-blue?style=for-the-badge)](https://aptoslabs.com/)
[![IoT Edge](https://img.shields.io/badge/IoT-ESP32-success?style=for-the-badge)](https://www.espressif.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 🌍 The Problem: The Accountability Gap in Public Transit
As global petrol prices rise, emerging markets are rapidly retrofitting public transit and school buses with Compressed Natural Gas (CNG). While cost-effective, unregulated high-pressure gas systems introduce a severe risk of catastrophic explosions, putting millions of commuting students in daily danger. 

Currently, there is a massive accountability void: corrupt fleet operators can easily ignore physical dashboard warnings or delete centralized database maintenance logs to avoid repair costs. The public has zero cryptographic proof of vehicle safety.

## 💡 The Solution: A Decentralized Safety Architecture
**CNG-Protect** bridges the gap between physical edge hardware and decentralized accountability. It acts as a tamper-proof safety infrastructure designed specifically to protect vulnerable commuters. 

If a hazard threshold is breached, the exact sensor metrics are permanently engraved onto a **Move smart contract on the Aptos Blockchain**. It is mathematically impossible for negligent mechanics, transport unions, or fleet managers to alter or erase this safety history.

---

## ⚙️ Technical Architecture

This repository contains the complete end-to-end architecture for the CNG-Protect prototype:

1. **Edge Hardware (ESP32):** - Microcontrollers equipped with MQ2 (Gas Concentration) and DHT11 (Engine Bay Temperature) sensors.
   - Pushes live telemetry data to the cloud every 2 seconds.
2. **Cloud Aggregation (Firebase):** - High-speed Realtime Database acting as the initial data ingestion layer.
3. **Web3 Middleware (Node.js):** - A custom bridge that listens to live telemetry.
   - If `is_danger` triggers (e.g., gas leak detected), the bridge automatically formulates, signs, and submits a transaction to the Aptos network.
4. **Immutable Ledger (Aptos):** - Custom Move smart contracts permanently log the exact gas levels and temperatures, providing trustless verification for parents, schools, and authorities.

---

## 📂 Repository Structure

* `/hardware/` - C++ code for the ESP32 edge devices, sensor calibration, and WiFi/Cloud syncing logic.
* `server.js` - The core Node.js middleware bridge integrating the Aptos TS SDK and Firebase Admin SDK.
* `alert.move` - The foundational Move smart contract deployed on the Aptos Testnet.
* `index.html` - The frontend "Student Transit Portal" dashboard for real-time monitoring and blockchain log verification.

---

## 🚀 Quick Start (Running the Bridge Locally)

**Prerequisites:** Node.js, an Aptos Testnet Wallet (e.g., Petra), and a Firebase Realtime Database.

1. Clone the repository:
   ```bash
   git clone [https://github.com/victor-ogbonna/CNG-Potect-Unicef.git](https://github.com/victor-ogbonna/CNG-Potect-Unicef.git)
   cd CNG-Potect-Unicef
