/*
  # Prathana Biomass – Initial Schema

  ## Summary
  Sets up two tables for the Prathana Biomass website:

  1. **inquiries** – Stores contact form submissions from visitors
     - id (uuid, PK)
     - name (text) – Sender's full name
     - email (text) – Sender's email address
     - phone (text) – Sender's phone number (optional)
     - message (text) – Inquiry message body
     - quantity_tonnes (numeric) – Requested order quantity in tonnes (optional)
     - status (text) – Workflow status: 'new' | 'read' | 'replied'
     - created_at (timestamptz)

  2. **Security**
     - RLS enabled on inquiries
     - Anon users can INSERT (submit contact form)
     - Authenticated users (admin) can SELECT, UPDATE all rows
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  message text NOT NULL DEFAULT '',
  quantity_tonnes numeric DEFAULT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
  ON inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update inquiry status"
  ON inquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
