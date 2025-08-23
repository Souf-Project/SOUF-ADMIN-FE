import client from "./client";

export const getMember = async ({ page, size, memberType, username, nickname }) => {
    try {
        const response = await client.get("/api/v1/admin/member", {
            params: {
              page: page,
              size: size,
              memberType: memberType,
              username: username,
              nickname: nickname,
            },
          });
          return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

