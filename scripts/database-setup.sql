-- Create tables for the NGO website

-- Table for contact form submissions
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subh_naam VARCHAR(255) NOT NULL,
    vishay VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    sandesh TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for event announcements
CREATE TABLE event_announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    pdf_link TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial event announcement
INSERT INTO event_announcements (event_name, pdf_link) 
VALUES ('आगामी सत्संग कार्यक्रम', 'https://drive.google.com/file/d/sample/view');

-- Enable Row Level Security (optional)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_announcements ENABLE ROW LEVEL SECURITY;

-- Create policies (optional - allows public read/write for demo)
CREATE POLICY "Allow public read access" ON contact_submissions FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access" ON event_announcements FOR SELECT USING (true);
CREATE POLICY "Allow public update access" ON event_announcements FOR UPDATE USING (true);
