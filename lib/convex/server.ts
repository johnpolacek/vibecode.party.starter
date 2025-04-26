import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export { api }; 