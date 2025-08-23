import client from "./client";

export const getPost = async ({ postType, writer, title, pageable }) => {
    try {
        const response = await client.get("/api/v1/admin/post", {
            params: {
                postType: postType,
                writer: writer,
                title: title,
                pageable: pageable,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}