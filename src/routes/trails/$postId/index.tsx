import { createFileRoute, useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

// Api / query options
import { trailQuery } from "../../../api/trails/trails.api";

function RouteComponent() {
  const params = useParams({ from: "/trails/$postId/" });
  const { postId } = params;
  const id = parseInt(String(postId), 10);

  const { data: trail } = useSuspenseQuery(trailQuery(id));

  if (!trail) return <div>Trail not found</div>;

  return (
    <div>
      <h1>{trail.title}</h1>
      <pre>{JSON.stringify(trail, null, 2)}</pre>
    </div>
  );
}

export const Route = createFileRoute("/trails/$postId/")({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { postId } }) =>
    queryClient.ensureQueryData(trailQuery(parseInt(postId, 10))),
});
