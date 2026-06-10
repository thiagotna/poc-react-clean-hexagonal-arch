import type { IUseCase } from '../../core/UseCases/IUseCase'
import type { IUserRepository } from '../../core/repositories/IUserRepository'
import type { GitHubUserDTO } from '../dtos/GitHubUserDTO'

export class FetchGitHubUserUseCase implements IUseCase<string, GitHubUserDTO> {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(username: string): Promise<GitHubUserDTO> {
    return this.userRepository.getUser(username)
  }
}
