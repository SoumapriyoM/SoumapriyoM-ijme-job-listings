const fetch = require('node-fetch');

exports.handler = async function() {
    const apiUrl = "https://backend.econjobmarket.org/data/zz_public/jsonp/Feature/5?callback=parseResults";

    try {
        const response = await fetch(apiUrl);
        const text = await response.text();

        // Strictly extract the JSON object between "parseResults(" and final ")"
        const jsonStart = text.indexOf('(') + 1;
        const jsonEnd = text.lastIndexOf(')');
        if (jsonStart < 1 || jsonEnd < 0) {
            throw new Error("Invalid JSONP response format.");
        }

        const jsonString = text.substring(jsonStart, jsonEnd).trim();

        // Parse the cleaned JSON string
        const data = JSON.parse(jsonString);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to fetch job data",
                details: error.message
            })
        };
    }
};
