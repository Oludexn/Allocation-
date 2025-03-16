async function searchWallet() {
    const wallet = document.getElementById("walletInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!wallet) {
        resultDiv.innerHTML = "<p style='color: red;'>Please enter a wallet address.</p>";
        return;
    }

    const githubRawUrl = "https://raw.githubusercontent.com/Oludexn/Allocation-/main/allocations.json";

    try {
        const response = await fetch(githubRawUrl); // Fetch JSON from GitHub
        const data = await response.json();

        const allocation = data.find(entry => entry.wallet.toLowerCase() === wallet.toLowerCase());

        if (allocation) {
            resultDiv.innerHTML = `
                <p><strong>Wallet:</strong> ${allocation.wallet}</p>
                <p><strong>Quantity:</strong> ${allocation.quantity}</p>
                <p><strong>Pending:</strong> ${allocation.pending}</p>
                <p><strong>Allocation:</strong> ${allocation.allocation}</p>
            `;
        } else {
            resultDiv.innerHTML = "<p style='color: red;'>Wallet not found.</p>";
        }
    } catch (error) {
        resultDiv.innerHTML = "<p style='color: red;'>Error loading data.</p>";
        console.error("Error fetching JSON:", error);
    }
}
