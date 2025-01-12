import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Routes from './Routes'

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Routes />
    </QueryClientProvider>
  )
}

export default App
