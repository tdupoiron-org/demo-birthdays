import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface Birthday {
  id: number;
  name: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export async function getBirthdays(): Promise<Birthday[]> {
  const result = await pool.query<Birthday>('SELECT * FROM "Birthday" ORDER BY "birthDate"');
  return result.rows;
}

export async function createBirthday(name: string, birthDate: Date): Promise<Birthday> {
  const result = await pool.query<Birthday>(
    'INSERT INTO "Birthday" (name, "birthDate", "createdAt", "updatedAt") VALUES ($1, $2, NOW(), NOW()) RETURNING *',
    [name, birthDate]
  );
  return result.rows[0];
}

export async function updateBirthday(id: number, name: string, birthDate: Date): Promise<Birthday | null> {
  const result = await pool.query<Birthday>(
    'UPDATE "Birthday" SET name = $1, "birthDate" = $2, "updatedAt" = NOW() WHERE id = $3 RETURNING *',
    [name, birthDate, id]
  );
  return result.rows[0] || null;
}

export async function deleteBirthday(id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM "Birthday" WHERE id = $1', [id]);
  return result.rowCount > 0;
}
