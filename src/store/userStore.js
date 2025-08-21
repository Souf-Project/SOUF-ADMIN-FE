import { create } from 'zustand';

export const useUserStore = create((set) => ({
  memberId: null,
  nickname: null,
  accessToken: null,
  
  setUser: (userData) => set({
    memberId: userData.memberId,
    nickname: userData.nickname,
    roleType: userData.roleType,
  }),
  
  setAccessToken: (token) => set({
    accessToken: token,
  }),
  
  clearUser: () => set({
    memberId: null,
    nickname: null,
    accessToken: null,
    roleType: null,
  }),
})); 