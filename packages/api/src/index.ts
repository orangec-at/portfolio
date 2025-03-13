import { GraphQLClient } from 'graphql-request';

export class HashnodeClient {
  private client: GraphQLClient;
  private publicationId: string;

  constructor(apiKey: string, publicationId: string, endpoint = 'https://gql.hashnode.com') {
    this.publicationId = publicationId;
    this.client = new GraphQLClient(endpoint, {
      headers: {
        Authorization: apiKey ? `Bearer ${apiKey}` : '',
      },
    });
  }

  async getPosts(first = 10) {
    const query = `
      query GetPosts($publicationId: ObjectId!, $first: Int!) {
        publication(id: $publicationId) {
          posts(first: $first) {
            edges {
              node {
                id
                title
                brief
                slug
                dateAdded
                coverImage {
                  url
                }
                content {
                  markdown
                }
                tags {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    `;

    const result = await this.client.request(query, {
      publicationId: this.publicationId,
      first,
    });

    return result.publication.posts.edges.map((edge) => edge.node);
  }

  async getPost(slug: string) {
    const query = `
      query GetPost($publicationId: ObjectId!, $slug: String!) {
        publication(id: $publicationId) {
          post(slug: $slug) {
            id
            title
            content {
              markdown
              html
            }
            brief
            slug
            dateAdded
            coverImage {
              url
            }
            tags {
              name
              slug
            }
          }
        }
      }
    `;

    const result = await this.client.request(query, {
      publicationId: this.publicationId,
      slug,
    });

    return result.publication.post;
  }
  
  async getTags() {
    const query = `
      query GetTags($publicationId: ObjectId!) {
        publication(id: $publicationId) {
          tags {
            name
            slug
            postsCount
          }
        }
      }
    `;

    const result = await this.client.request(query, {
      publicationId: this.publicationId,
    });

    return result.publication.tags;
  }
}

export default HashnodeClient;
