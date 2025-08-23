import client from "./client";

export const postLogin = async ({ email, password }) => {
    try {
        const response = await client.post("/api/v1/auth/login", {
            email: email,
            password: password,
          });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

