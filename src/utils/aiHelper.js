function analyzeTicket(text) {
    text = text.toLowerCase();

    let category = "General";
    let priority = "Low";

    if (text.includes("payment") || text.includes("bill")) {
        category = "Billing";
        priority = "High";
    } else if (text.includes("error") || text.includes("bug")) {
        category = "Technical";
        priority = "Medium";
    }

    return { category, priority };
}

module.exports = analyzeTicket;