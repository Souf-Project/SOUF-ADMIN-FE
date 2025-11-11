import client from "./client";

export const getInquiry = async ({ page, size, inquiryType, inquiryStatus }) => {
    
    try {
        const params = {
            page: page,
            size: size,
        };

        if (inquiryType && inquiryType !== "ALL") {
            params.inquiryType = inquiryType;
        }

        if (inquiryStatus && inquiryStatus !== "ALL") {
            params.inquiryStatus = inquiryStatus;
        }

        const response = await client.get("/api/v1/admin/inquiry", {
            params: params,
        });

        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const patchInquiryStatus = async ({ inquiryId, answer, status }) => {
    try {
        const response = await client.patch(`/api/v1/admin/inquiry/${inquiryId}`, {
            answer: answer,
            status: status,
        });
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}