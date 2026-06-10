import { createControllerFactory } from '../../core/factories/createFactoryController/createFactoryController'
import { FetchGitHubUserUseCase } from '../../domain/usecases/FetchGitHubUserUseCase'
import { GitHubUserRepository } from '../../infrastructure/http/GitHubUserRepository'

const gitHubUserRepository = new GitHubUserRepository()
const fetchGitHubUserUseCase = new FetchGitHubUserUseCase(gitHubUserRepository)

export const useGitHubUser = createControllerFactory(fetchGitHubUserUseCase)
