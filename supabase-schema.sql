-- Create tables for Archistudio website

-- Settings table
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  site_name TEXT NOT NULL DEFAULT 'Archistudio',
  logo TEXT,
  description TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  facebook TEXT,
  instagram TEXT,
  linkedin TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  category TEXT,
  location TEXT,
  year INTEGER,
  area TEXT,
  status TEXT DEFAULT 'completed',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image TEXT,
  features TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  image TEXT,
  rating INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Team table
CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  image TEXT,
  email TEXT,
  linkedin TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quotes table
CREATE TABLE quotes (
  id BIGSERIAL PRIMARY KEY,
  client TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  project TEXT,
  surface_area TEXT,
  budget TEXT,
  description TEXT,
  preferred_start_date DATE,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Appointments table
CREATE TABLE appointments (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow public read access for public data
CREATE POLICY "Public read access for settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access for testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access for team" ON team FOR SELECT USING (true);

-- Allow public insert for forms
CREATE POLICY "Public insert for messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for quotes" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for appointments" ON appointments FOR INSERT WITH CHECK (true);

-- Allow service role full access (for admin operations)
CREATE POLICY "Service role full access settings" ON settings USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access projects" ON projects USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access services" ON services USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access testimonials" ON testimonials USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access team" ON team USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access messages" ON messages USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access quotes" ON quotes USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access appointments" ON appointments USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Insert default settings
INSERT INTO settings (site_name, description, email, phone, address) VALUES
('Archistudio', 'Architecture moderne et design innovant', 'contact@archistudio.com', '+33 1 23 45 67 89', 'Paris, France');
