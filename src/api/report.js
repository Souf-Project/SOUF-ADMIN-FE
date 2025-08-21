import client from "./client";

export const getReport = async ({ postType, startDate, endDate, nickname, pageable }) => {
    try {
        const response = await client.get("/api/v1/admin/report", {
            params: {
                postType: postType,
                startDate: startDate,
                endDate: endDate,
                nickname: nickname,
                pageable: pageable,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}