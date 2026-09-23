import { createFileRoute } from "@tanstack/react-router";
import { AppNotFound } from "@/components/layout/not-found";

export const Route = createFileRoute("/_app/$")({
  component: AppNotFound,
});
