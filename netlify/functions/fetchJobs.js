const fetch = require('node-fetch');

exports.handler = async function() {
    const apiUrl = "https://backend.econjobmarket.org/data/zz_public/jsonp/Feature/5?callback=parseResults";

    try {
        const response = await fetch(apiUrl);
        const text = await response.text();

        // Remove JSONP wrapper: parseResults(...)
        const jsonStart = text.indexOf("(") + 1;
        const jsonEnd = text.lastIndexOf(")");
        const jsonString = text.substring(jsonStart, jsonEnd);

        const data = JSON.parse(jsonString);

        // Respond with clean JSON
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data", details: error.message })
        };
    }
};
