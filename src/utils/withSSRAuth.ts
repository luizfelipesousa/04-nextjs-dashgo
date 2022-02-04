import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies, destroyCookie } from "nookies";
import decode from "jwt-decode";
import validatePermission from "./validatePermissions";

interface withSSRAuthOptionsProps {
  permissions?: string[];
  roles?: string[];
}

export default function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: withSSRAuthOptionsProps
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);

    console.log("withSSRAuth", cookies);
    const token = cookies["dashgo.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const {
      permissions,
      roles,
      sub: email,
    } = decode<{ permissions: string[]; roles: string[]; sub: string }>(token);
    if (options) {
      const userHasPermission = validatePermission(
        { email, permissions, roles },
        { permissions: options.permissions, roles: options.roles }
      );

      if (!userHasPermission) {
        return {
          redirect: {
            destination: "/users",
            permanent: false,
          },
        };
      }
    }
    try {
      return await fn(context);
    } catch (error) {
      console.log("error");
      destroyCookie(context, "dashgo.token");
      destroyCookie(context, "dashgo.refreshToken");
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
