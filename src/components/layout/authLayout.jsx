import AuthDescription from "./authDescription";


export default function AuthLayout({ title, children }) {
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row bg-yellow-main">
      <AuthDescription/>
      <div className="bg-yellow-main w-full lg:w-1/2 lg:bg-white flex flex-col justify-center items-center px-4 sm:h-full">
        <div className="text-3xl lg:text-5xl font-bold mb-10">{title}</div>
        {children}
      </div>
    </div>
  );
}
