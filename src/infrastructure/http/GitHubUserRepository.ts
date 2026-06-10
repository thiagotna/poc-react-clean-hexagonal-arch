import type { IUserRepository } from '../../core/repositories/IUserRepository'
import type { GitHubUserDTO } from '../../domain/dtos/GitHubUserDTO'

export class GitHubUserRepository implements IUserRepository {
  private readonly baseUrl = 'https://api.github.com'

  async getUser(username: string): Promise<GitHubUserDTO> {
    const response = await fetch(`${this.baseUrl}/users/${username}`)

    if (!response.ok) {
      throw new Error(`Falha ao buscar usuário ${username}: ${response.statusText}`)
    }

    const data: GitHubUserDTO = await response.json()
    return data
  }
}
