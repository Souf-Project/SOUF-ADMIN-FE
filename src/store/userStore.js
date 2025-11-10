import { create } from 'zustand';

// localStorage에서 사용자 정보 복원
const loadUserFromStorage = () => {
  try {
    const memberId = localStorage.getItem('memberId');
    const nickname = localStorage.getItem('nickname');
    const accessToken = localStorage.getItem('accessToken');
    const roleType = localStorage.getItem('roleType');
    
    return {
      memberId: memberId ? (isNaN(memberId) ? memberId : Number(memberId)) : null,
      nickname: nickname || null,
      accessToken: accessToken || null,
      roleType: roleType || null,
    };
  } catch (error) {
    console.error('localStorage에서 사용자 정보 로드 실패:', error);
    return {
      memberId: null,
      nickname: null,
      accessToken: null,
      roleType: null,
    };
  }
};

export const useUserStore = create((set) => ({
  ...loadUserFromStorage(),
  
  setUser: (userData) => {
    set({
      memberId: userData.memberId,
      nickname: userData.nickname,
      roleType: userData.roleType,
    });
    // localStorage에도 저장
    if (userData.memberId) localStorage.setItem('memberId', userData.memberId);
    if (userData.nickname) localStorage.setItem('nickname', userData.nickname);
    if (userData.roleType) localStorage.setItem('roleType', userData.roleType);
  },
  
  setAccessToken: (token) => {
    set({ accessToken: token });
    if (token) localStorage.setItem('accessToken', token);
  },
  
  clearUser: () => {
    set({
      memberId: null,
      nickname: null,
      accessToken: null,
      roleType: null,
    });
    // localStorage에서도 제거
    localStorage.removeItem('memberId');
    localStorage.removeItem('nickname');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roleType');
  },
})); 