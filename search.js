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

        // Filter out all allocations for the given wallet
        const allocations = data.filter(entry => entry.wallet.toLowerCase() === wallet.toLowerCase());

        if (allocations.length === 0) {
            resultDiv.innerHTML = "<p style='color: red;'>Wallet not found.</p>";
            return;
        }

        // If only one allocation exists, display it directly
        if (allocations.length === 1) {
            const allocation = allocations[0];
            resultDiv.innerHTML = `
                <p><strong>Wallet:</strong> ${allocation.wallet}</p>
                <p><strong>Quantity:</strong> ${allocation.quantity}</p>
                <p><strong>Pending:</strong> ${allocation.pending}</p>
                <p><strong>Allocation:</strong> $CN ${allocation.allocation}</p>
            `;
        } else {
            // If multiple allocations exist, sum them up
            let totalAllocation = allocations.reduce((sum, entry) => sum + parseInt(entry.allocation), 0);
            let details = allocations.map(entry => `<p><strong>Allocation:</strong> $CN ${entry.allocation}</p>`).join("");

            resultDiv.innerHTML = `
                <p><strong>Wallet:</strong> ${wallet}</p>
                ${details}
                <p><strong>Total Allocation:</strong> $CN ${totalAllocation}</p>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = "<p style='color: red;'>Error loading data.</p>";
        console.error("Error fetching JSON:", error);
    }
}
