export const DATABASE_CONNECTION_ERROR_MESSAGE =
  'Unable to connect to the database. Check that POSTGRES_URL is set correctly and that Postgres is running.';

export function isDatabaseConnectionError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.message.includes('ECONNREFUSED') ||
    error.message.includes('Failed to fetch') ||
    ('code' in error && (error as { code?: string }).code === 'ECONNREFUSED')
  );
}