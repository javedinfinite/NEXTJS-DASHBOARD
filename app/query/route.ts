import postgres from 'postgres';
import { DATABASE_CONNECTION_ERROR_MESSAGE, isDatabaseConnectionError } from '../lib/db-error';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	try {
	  const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;

	  return data;
	} catch (error) {
	  if (isDatabaseConnectionError(error)) {
	    console.error('Database Error:', error);
	    return Response.json({ error: DATABASE_CONNECTION_ERROR_MESSAGE }, { status: 503 });
	  }

	  throw error;
	}
}

export async function GET() {
  const data = await listInvoices();
  if (data instanceof Response) {
    return data;
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
