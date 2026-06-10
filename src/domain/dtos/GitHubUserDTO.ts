export interface GitHubUserDTO {
  id: number
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}
