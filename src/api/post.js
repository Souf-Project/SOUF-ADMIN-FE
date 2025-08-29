import client from "./client";

export const getPost = async ({ postType, writer, title, page, size }) => {
    try {
        const response = await client.get("/api/v1/admin/post", {
            params: {
                postType: postType,
                writer: writer,
                title: title,
                page: page,
                size: size,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}