async function selectFilter(req, decryptedPayload) {
    for (const key in decryptedPayload) {
        const value = decryptedPayload[key];

        // Check if it's a direct object with { value, label }
        if (
            value &&
            typeof value === "object" &&
            !Array.isArray(value) &&
            "value" in value &&
            "label" in value
        ) {
            decryptedPayload[key] = value.value;
        }

        // Check for _options arrays
        if (key.endsWith("_options") && Array.isArray(value)) {
            for (const item of value) {
                for (const innerKey in item) {
                    const innerValue = item[innerKey];
                    if (
                        innerValue &&
                        typeof innerValue === "object" &&
                        "value" in innerValue &&
                        "label" in innerValue
                    ) {
                        item[innerKey] = innerValue.value;
                    }
                }
            }
        }
    }

    return decryptedPayload;
}


module.exports = {selectFilter}