import { useState } from 'react'
import { useGitHubUser } from '../controllers/createGitHubUserController'

export function GitHubUserViewer() {
  const [inputValue, setInputValue] = useState('')
  const { data, loading, error, execute } = useGitHubUser({
    onSuccess: (user) => console.log('Usuário carregado:', user),
    onError: (err) => console.error('Erro ao buscar usuário:', err),
  })

  const validateUsername = (username: string): boolean => {
    return /^[\w-]+$/.test(username) && username.length > 0
  }

  const handleSearch = () => {
    if (validateUsername(inputValue)) {
      execute(inputValue)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>GitHub User Viewer</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch()
        }}
        style={{ display: 'flex', gap: '8px' }}
      >
        <input
          type="text"
          placeholder="Digite um username do GitHub"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontFamily: 'Arial, sans-serif',
          }}
        />
        <button
          type="submit"
          disabled={loading || !validateUsername(inputValue)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor:
              loading || !validateUsername(inputValue)
                ? 'not-allowed'
                : 'pointer',
            opacity: loading || !validateUsername(inputValue) ? 0.6 : 1,
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Carregando...' : 'Buscar'}
        </button>
      </form>

      {error && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#ffcccc',
            color: '#cc0000',
            borderRadius: '4px',
          }}
        >
          <strong>Erro:</strong> {error}
        </div>
      )}

      {data && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <div
            style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}
          >
            <img
              src={data.avatar_url}
              alt={data.login}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
              }}
            />

            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 5px 0' }}>{data.name || data.login}</h2>
              {data.bio && (
                <p style={{ margin: '5px 0', color: '#666' }}>{data.bio}</p>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginTop: '10px',
                  fontSize: '14px',
                }}
              >
                <div>
                  <strong>Repositórios:</strong> {data.public_repos}
                </div>
                <div>
                  <strong>Seguidores:</strong> {data.followers}
                </div>
                <div>
                  <strong>Seguindo:</strong> {data.following}
                </div>
                <div>
                  <strong>ID:</strong> {data.id}
                </div>
              </div>

              <p
                style={{
                  margin: '10px 0 0 0',
                  fontSize: '12px',
                  color: '#999',
                }}
              >
                Membro desde:{' '}
                {new Date(data.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
