
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import App from './App.tsx'
import './index.css' // Tailwind's base styles

// Create a client for React Query with optimized configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: 5 minutes - data remains fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache time: 10 minutes - data stays in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times
      retry: 3,
      // Retry with exponential backoff
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Don't refetch on window focus (better for mobile data usage)
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <QueryClientProvider client={queryClient}>
  //     <BrowserRouter>
  //       <App />
  //       <Toaster position="top-right" />
  //     </BrowserRouter>
  //     <ReactQueryDevtools initialIsOpen={false} />
  //   </QueryClientProvider>
  // </React.StrictMode>,
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
) 