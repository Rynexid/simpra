import { app } from "../src/app";

export const config = {
  runtime: "nodejs20.x",
};

export default async (req: Request) => {
  return app.fetch(req);
};
