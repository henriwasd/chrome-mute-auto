// Função para enviar uma mensagem ao background script para silenciar outras abas
function muteOtherTabs() {
  try {
    chrome.runtime.sendMessage({ type: 'mute_other_tabs' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Erro ao enviar mensagem para silenciar outras abas:', chrome.runtime.lastError)
      } else {
        console.log('Mensagem enviada para silenciar outras abas:', response)
      }
    })
  } catch (error) {
    console.error('Erro ao tentar silenciar outras abas:', error)
  }
}

// Função para configurar o listener de mudança de visibilidade da página
function setupPageVisibilityChangeListener() {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      muteOtherTabs()
    }
  })
}

// Configura o listener de mudança de visibilidade da página
setupPageVisibilityChangeListener()

// Silencia outras abas se a página estiver visível no momento do carregamento
if (document.visibilityState === 'visible') {
  muteOtherTabs()
}