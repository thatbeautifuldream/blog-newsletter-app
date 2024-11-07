import { gql, GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://gql.hashnode.com", {
  method: "POST",
});

type FetchPostsResponse = {
  data: {
    publication: {
      posts: {
        edges: {
          node: {
            title: string;
            brief: string;
            url: string;
          };
        }[];
      };
    };
  };
};

export async function fetchPosts(): Promise<
  FetchPostsResponse["data"]["publication"]["posts"]["edges"][number]["node"][]
> {
  const query = gql`
    query GetPosts {
      publication(host: "blog.proofofskill.org") {
        posts(first: 10) {
          edges {
            node {
              title
              brief
              url
            }
          }
        }
      }
    }
  `;
  const data: FetchPostsResponse["data"] = await client.request(query);
  return data?.publication?.posts?.edges.map((edge) => edge.node) ?? [];
}

type FetchPostBySlugResponse = {
  data: {
    publication: {
      post: {
        title: string;
        content: {
          markdown: string;
          html: string;
        };
      };
    };
  };
};

export async function fetchPostBySlug(
  slug: string
): Promise<FetchPostBySlugResponse["data"]["publication"]["post"]> {
  const query = gql`
    query GetPostBySlug($slug: String!) {
      publication(host: "blog.proofofskill.org") {
        post(slug: $slug) {
          title
          content {
            markdown
            html
          }
        }
      }
    }
  `;
  const variables = { slug };
  const data: FetchPostBySlugResponse["data"] = await client.request(
    query,
    variables
  );
  return data?.publication?.post;
}
