import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Members from "../pages/members";
import Posts from "../pages/posts";
import Advertisements from "../pages/advertisement/advertisements";
import Reports from "../pages/reports";
import Header from "../components/common/header";
import AddMainHorizontal from "../pages/advertisement/addMainHorizontal";
import Inquiry from "../pages/inquiry";
import { useUserStore } from "../store/userStore";

function ProtectedRoute({ children }) {
  const { memberId } = useUserStore();
  const isLoggedIn = memberId !== null && memberId !== undefined;

  if (!isLoggedIn) {
    alert('로그인 후 이용가능합니다!');
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRouter() {
  const location = useLocation();
  const noHeaderPaths = ["/login", "/pwdFind"]; // Header 없는 페이지 경로
  const isNoHeaderPage = noHeaderPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen w-full">
        {!isNoHeaderPage && <Header />}
        <main>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
                <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
                <Route path="/advertisements" element={<ProtectedRoute><Advertisements /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                <Route path="/inquiry" element={<ProtectedRoute><Inquiry /></ProtectedRoute>} />
                <Route path="/add/mainHorizontal" element={<ProtectedRoute><AddMainHorizontal/></ProtectedRoute>} />
            </Routes>
        </main>
    </div>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

/*
      <Header />
      <main className="flex-grow w-full mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyStudent" element={<VerifyStudent />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/recruitDetails/:id" element={<RecruitDetail />} />
          <Route path="/recruitsAll" element={<RecruitsAll />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/join" element={<Join />} />
          <Route path="/pwdFind" element={<PwdFind />} />
          <Route path="/students" element={<StudentProfileList />} />
          <Route path="/profileDetail/:id" element={<ProfileDetail />} />
          <Route
            path="/profileDetail/:id/post/:worksId"
            element={<PostDetail />}
          />
          <Route path="/postEdit" element={<PostEdit />} />
          <Route path="/postUpload" element={<PostUpload />} />
          <Route path="/recruitUpload" element={<RecruitUpload />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/contests/:category/:id" element={<ContestDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/withdraw" element={<Withdraw/>} />
          <Route path="/forbidden" element={<Forbidden/>} />
        </Routes>
      </main>
      {!isChatPage && <Footer />}
      <FloatingActionButton />


*/