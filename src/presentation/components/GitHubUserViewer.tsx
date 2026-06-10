import { useGitHubUser } from '../controllers/createGitHubUserController'

export function GitHubUserViewer() {
  const { data, loading, error, execute } = useGitHubUser({
    onSuccess: (user) => console.log('Usuário carregado:', user),
    onError: (err) => console.error('Erro ao buscar usuário:', err),
  })

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>GitHub User Viewer</h1>

      <button
        onClick={() => execute('thiagotna')}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Carregando...' : 'Buscar usuário thiagotna'}
      </button>

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
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
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
              {data.bio && <p style={{ margin: '5px 0', color: '#666' }}>{data.bio}</p>}

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

              <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#999' }}>
                Membro desde: {new Date(data.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
