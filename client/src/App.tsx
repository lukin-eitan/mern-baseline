import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from './router/Router';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => {
  const r = router(queryClient);
  return (
    <>
      <CssBaseline enableColorScheme />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={r} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
