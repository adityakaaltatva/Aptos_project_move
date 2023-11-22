const aptos = new Aptos();
const walletAdapter = new WalletAdapter(aptos);
const clickGameContractAddress = '0xe51b0acfb3f3f018e8d40a4d13585bd1078e34870b6d6aa4995ada7e03ab06eb'; // Replace with your deployed contract address
const clickGameContract = aptos.contract(clickGameContractAddress, ABI);

const connectWalletBtn = document.getElementById('connectWalletBtn');
connectWalletBtn.addEventListener('click', async () => {
  await walletAdapter.connect();
});

const clickBtn = document.getElementById('clickBtn');
const clickCountDisplay = document.getElementById('clickCount');

clickBtn.addEventListener('click', async () => {
  if (!walletAdapter.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  try {
    const signer = walletAdapter.provider.getSigner();
    const clickGameContractWithSigner = clickGameContract.connect(signer);
    await clickGameContractWithSigner.clickButton();

    // Update click count from the blockchain
    const updatedClickCount = await clickGameContract.getClickCount();
    clickCountDisplay.textContent = updatedClickCount.toString();
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while clicking the button.');
  }
});
