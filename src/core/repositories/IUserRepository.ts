import type { GitHubUserDTO } from '../../domain/dtos/GitHubUserDTO'

export interface IUserRepository {
  getUser(username: string): Promise<GitHubUserDTO>
}
