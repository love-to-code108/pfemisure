

export async function getShiprocketToken() {
    try {
        const response = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: process.env.SHIPROCKET_EMAIL,
                password: process.env.SHIPROCKET_PASSWORD
            })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            return { success: true, token: data.token };
        } else {
            console.error("Shiprocket Auth Failed:", data);
            return { success: false, error: data.message || "Failed to authenticate with Shiprocket" };
        }
    } catch (error) {
        console.error("Shiprocket Network Error:", error);
        return { success: false, error: "Network error while connecting to Shiprocket." };
    }
}