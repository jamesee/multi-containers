import { LoginForm, useAuth} from "../domains/auth";
import * as React from "react";
import { UserProfileForm } from "../domains/userProfile/components/userprofile-form";


export const UserProfile = () => {
  const auth = useAuth();

  return (

    <>
      {
        auth.status === "anonymous" &&
        <main className="bg-gray-50 p-6 sm:p-12 min-h-screen">
          <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <LoginForm />
          </div>
        </main>
      }
      {
      auth.status === "authenticated" &&

    <main className="bg-gray-50 lg:flex">

      <div className="flex-1">
        <div className="max-w-7xl mx-auto pt-10 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-5xl font-extrabold text-pink-700 sm:text-center">
              User Profile
            </h1>
          </div>

            {/* =============== product li end ============  */}
        <div>
            <UserProfileForm />
        </div>
          {/*  =============== product ul end ============ */}
        </div>
      </div>

    </main>
  }

</>
  );
};
