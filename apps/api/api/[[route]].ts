import { app } from "../src/app";

export const config = {
  runtime: "nodejs",
};

export default async (req: Request) => {
  return app.fetch(req);
};
