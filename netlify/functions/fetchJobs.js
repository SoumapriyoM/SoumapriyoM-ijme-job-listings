const fetch = require('node-fetch');

exports.handler = async function() {
    const apiUrl = "https://backend.econjobmarket.org/data/zz_public/jsonp/Feature/5?callback=parseResults";

    try {
        const response = await fetch(apiUrl);
        const rawText = await response.text();

        // Safely extract content between "parseResults(" and the final ")"
        const jsonStart = rawText.indexOf('(') + 1;  // Find first '('
        const jsonEnd = rawText.lastIndexOf(')');   // Find last ')'

        if (jsonStart === 0 || jsonEnd === -1) {
            throw new Error("Invalid JSONP format - could not find proper wrapping");
        }

        const jsonText = rawText.substring(jsonStart, jsonEnd).trim();

        // Try parsing the extracted JSON
        const parsedData = JSON.parse(jsonText);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parsedData)
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
