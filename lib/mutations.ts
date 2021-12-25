import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { email: string; password: string }
) => {
  fetcher(`/${mode}`, body);
};
