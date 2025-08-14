import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import PwdFind from "../pages/pwdFind";

function AppRouter() {

  return (
    <div className="flex flex-col min-h-screen">
        <main>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/pwdFind" element={<PwdFind/>}/>
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