import client from "./client";

export const getMember = async ({ page, size, memberType, username, nickname, approvedStatus }) => {
    try {
        const params = {
            page: page,
            size: size,
        };

        if (memberType) {
            params.memberType = memberType;
        }

        if (username) {
            params.username = username;
        }

        if (nickname) {
            params.nickname = nickname;
        }

        if (approvedStatus) {
            params.approvedStatus = approvedStatus;
        }

        const response = await client.get("/api/v1/admin/member", {
            params: params,
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const patchMemberStatus = async ({ memberId, approvedStatus, requestBody }) => {
    try {
        const response = await client.patch(`/api/v1/admin/member/${memberId}`, 
            requestBody,
            {
                params: {
                    approvedStatus: approvedStatus,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

